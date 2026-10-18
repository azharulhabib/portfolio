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

      const fallbackW = window.innerWidth >= 1024 ? 380 : window.innerWidth >= 768 ? 270 : window.innerWidth >= 640 ? 240 : 190;
      const portraitW = rect.width > 0 ? rect.width : fallbackW;
      const portraitH = rect.height > 0 ? rect.height : Math.round(portraitW * 1.5);

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
      const centerX = padX + portraitW / 2;
      const centerY = padY + portraitH / 2;

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

            // Deterministic pseudo-random seed based strictly on (r, c)
            // Guarantees 100% reproducible, perfectly balanced particle distribution on every load
            const raw = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
            const pseudo = raw - Math.floor(raw);

            // Symmetrical 360-degree radial convergence from outer field
            const dx = targetX - centerX;
            const dy = targetY - centerY;
            const distFromCenter = Math.hypot(dx, dy);
            const baseAngle = distFromCenter > 5 ? Math.atan2(dy, dx) : (pseudo * Math.PI * 2);
            const spreadAngle = baseAngle + (pseudo - 0.5) * 0.7;

            // Centered spawn radius: closer to the portrait instead of far outer bounds
            const offsetDist = portraitW * (0.22 + pseudo * 0.26);
            const startX = targetX + Math.cos(spreadAngle) * offsetDist;
            const startY = targetY + Math.sin(spreadAngle) * offsetDist;

            // Organic curved / swerving trajectory parameters
            const pathDx = targetX - startX;
            const pathDy = targetY - startY;
            const pathDist = Math.hypot(pathDx, pathDy) || 1;
            const perpX = -pathDy / pathDist;
            const perpY = pathDx / pathDist;
            const curveAmp = (pseudo - 0.5) * Math.min(pathDist * 0.45, portraitW * 0.16);

            const brightness = (red + green + blue) / (3 * 255);
            const radius = 1.0 + brightness * 1.4;

            // Gently slowed down by a tiny amount for smoother, graceful arrival
            const delay = pseudo * 200;
            const duration = 800 + (1 - pseudo) * 200;

            particles.push({
              targetX,
              targetY,
              startX,
              startY,
              perpX,
              perpY,
              curveAmp,
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

          // Organic curved trajectory (gives natural floating/swirling feel without straight line motion)
          const wave = Math.sin(ease * Math.PI) * (1 + 0.22 * Math.sin(ease * Math.PI * 2));
          const currentX = p.startX + (p.targetX - p.startX) * ease + p.perpX * p.curveAmp * wave;
          const currentY = p.startY + (p.targetY - p.startY) * ease + p.perpY * p.curveAmp * wave;
          const currentAlpha = Math.min(t * 3.5, 1);

          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // STEP 1: While atoms are converging into position, begin crossfading the real picture IN
        if (elapsed > 600 && !imageFadeStarted) {
          imageFadeStarted = true;
          setImageOpacity(1);
        }

        // STEP 2: Once atoms have reached their target and the image is visible, gently fade canvas OUT
        if (elapsed > 980 && !canvasFadeStarted) {
          canvasFadeStarted = true;
          setCanvasOpacity(0);
        }

        // STEP 3: Animation complete, cleanly unmount canvas
        if (elapsed > 1550) {
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
