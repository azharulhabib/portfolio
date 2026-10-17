import React, { useEffect, useRef, useState } from "react";
import portraitImg from "../assets/neon_ascii_portrait_transparent.png";

export default function AsciiPortrait() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [canvasOpacity, setCanvasOpacity] = useState(0);
  const [canvasPadding, setCanvasPadding] = useState({ x: 260, y: 200 });
  const [showCanvas, setShowCanvas] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setImageOpacity(1);
      setShowCanvas(false);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId;
    let isCancelled = false;

    const img = new Image();
    img.src = portraitImg;

    const initAnimation = () => {
      if (isCancelled) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const portraitW = rect.width || 350;
      const portraitH = rect.height || portraitW * 1.5;

      // Dynamically scale canvas margins based on portrait dimensions,
      // safely bounded to available viewport width on mobile to prevent iOS horizontal overscroll
      const maxPadX = Math.max(16, Math.floor((window.innerWidth - portraitW) / 2) - 8);
      const padX = Math.min(Math.round(portraitW * 0.7), maxPadX);
      const padY = Math.round(portraitH * 0.35);
      setCanvasPadding({ x: padX, y: padY });

      const canvasW = portraitW + padX * 2;
      const canvasH = portraitH + padY * 2;

      canvas.width = canvasW * dpr;
      canvas.height = canvasH * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, canvasW, canvasH);
      
      // Make canvas visible now that it is prepared
      setCanvasOpacity(1);

      const naturalW = img.naturalWidth || 1024;
      const naturalH = img.naturalHeight || 1536;

      // Extract high-density particle coordinates from image (~2,800 active particles)
      const offscreen = document.createElement("canvas");
      const sampleCols = 120;
      const sampleRows = 180;
      offscreen.width = sampleCols;
      offscreen.height = sampleRows;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, sampleCols, sampleRows);
      const imgData = offCtx.getImageData(0, 0, sampleCols, sampleRows).data;

      const particles = [];

      for (let r = 0; r < sampleRows; r++) {
        for (let c = 0; c < sampleCols; c++) {
          const idx = (r * sampleCols + c) * 4;
          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];
          const alpha = imgData[idx + 3] / 255;

          if (alpha > 0.15 && (red > 18 || green > 18 || blue > 18)) {
            const targetX = padX + (c / sampleCols) * portraitW;
            const targetY = padY + (r / sampleRows) * portraitH;

            // Randomized spawn positions from wide surrounding field
            const zone = Math.floor(Math.random() * 4);
            let startX, startY;

            if (zone === 0) {
              startX = Math.random() * padX;
              startY = Math.random() * canvasH;
            } else if (zone === 1) {
              startX = padX + portraitW + Math.random() * padX;
              startY = Math.random() * canvasH;
            } else if (zone === 2) {
              startX = Math.random() * canvasW;
              startY = Math.random() * padY;
            } else {
              startX = Math.random() * canvasW;
              startY = padY + portraitH + Math.random() * padY;
            }

            const brightness = (red + green + blue) / (3 * 255);
            const radius = 1.0 + brightness * 1.4;

            const delay = Math.random() * 150;
            const duration = 600 + Math.random() * 200;

            particles.push({
              targetX,
              targetY,
              startX,
              startY,
              color: `rgba(${red}, ${green}, ${blue}, ${Math.min(alpha, 0.95)})`,
              radius,
              delay,
              duration,
            });
          }
        }
      }

      let startTime = null;
      let imageFadeStarted = false;
      let canvasFadeStarted = false;

      const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

      const render = (timestamp) => {
        if (isCancelled) return;
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        ctx.clearRect(0, 0, canvasW, canvasH);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const particleElapsed = elapsed - p.delay;

          if (particleElapsed <= 0) continue;

          const t = Math.min(particleElapsed / p.duration, 1);
          const ease = easeOutQuart(t);

          const currentX = p.startX + (p.targetX - p.startX) * ease;
          const currentY = p.startY + (p.targetY - p.startY) * ease;
          const currentAlpha = Math.min(t * 3.5, 1);

          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // STEP 1: While atoms are converging into position, begin crossfading the real picture IN
        if (elapsed > 450 && !imageFadeStarted) {
          imageFadeStarted = true;
          setImageOpacity(1);
        }

        // STEP 2: Once atoms have reached their target and the image is visible, gently fade canvas OUT
        if (elapsed > 780 && !canvasFadeStarted) {
          canvasFadeStarted = true;
          setCanvasOpacity(0);
        }

        // STEP 3: Animation complete, cleanly unmount canvas
        if (elapsed > 1300) {
          setShowCanvas(false);
          return;
        }

        animFrameId = requestAnimationFrame(render);
      };

      animFrameId = requestAnimationFrame(render);
    };

    if (img.complete) {
      initAnimation();
    } else {
      img.onload = initAnimation;
    }

    return () => {
      isCancelled = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center select-none py-2">
      {/* Target Portrait Container - Responsive on mobile, 380px on PC */}
      <div
        ref={containerRef}
        className="relative w-[190px] sm:w-[240px] md:w-[270px] lg:w-[380px] aspect-[2/3]"
      >
        {/* Real Static Image (Fades in seamlessly as atoms converge, NEVER disappearing) */}
        <div className="w-full h-full overflow-hidden rounded-2xl">
          <img
            src={portraitImg}
            alt="Azharul Habib - Neon ASCII Portrait"
            className="w-full h-full object-contain object-center"
            style={{
              opacity: imageOpacity,
              transition: "opacity 450ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        {/* Big Overflown Particle Canvas (Proportional to portrait size) */}
        {showCanvas && (
          <canvas
            ref={canvasRef}
            className="absolute pointer-events-none"
            style={{
              top: `-${canvasPadding.y}px`,
              left: `-${canvasPadding.x}px`,
              width: `calc(100% + ${canvasPadding.x * 2}px)`,
              height: `calc(100% + ${canvasPadding.y * 2}px)`,
              opacity: canvasOpacity,
              transition: "opacity 450ms ease-out",
            }}
          />
        )}
      </div>
    </div>
  );
}
