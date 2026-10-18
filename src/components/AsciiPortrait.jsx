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

      try {
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

            // Deterministic pseudo-random seeds based strictly on (r, c)
            // Ensures 100% reproducible, consistent layout between visits and reloads
            const raw1 = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
            const pseudo1 = raw1 - Math.floor(raw1);

            const raw2 = Math.sin(c * 39.346 + r * 11.135) * 43758.5453;
            const pseudo2 = raw2 - Math.floor(raw2);

            const raw3 = Math.sin((r + c) * 23.451) * 43758.5453;
            const pseudo3 = raw3 - Math.floor(raw3);

            // Isotropic 360-degree dispersion around each particle's own target (matching Gazi Jarin's recording)
            // Wider scatter distance for a more expansive, dramatic gathering
            const scatterAngle = pseudo1 * Math.PI * 2;
            const scatterDist = portraitW * (0.20 + pseudo2 * 0.38);

            const startX = targetX + Math.cos(scatterAngle) * scatterDist;
            const startY = targetY + Math.sin(scatterAngle) * scatterDist;

            const brightness = (red + green + blue) / (3 * 255);
            const radius = 1.0 + brightness * 1.4;

            // Staggered activation delay (up to 120ms)
            const delay = pseudo3 * 120;

            particles.push({
              x: startX,
              y: startY,
              targetX,
              targetY,
              vx: 0,
              vy: 0,
              color: `rgba(${red}, ${green}, ${blue}, ${Math.min(alpha, 0.95)})`,
              radius,
              delay,
            });
          }
        }
      }

      let startTime = null;
      let lastTime = null;
      let imageFadeStarted = false;
      let canvasFadeStarted = false;

      const render = (timestamp) => {
        if (isCancelled) return;
        if (!startTime) {
          startTime = timestamp;
          lastTime = timestamp;
        }
        const elapsed = timestamp - startTime;
        // Frame delta normalized to 60fps (16.67ms) to maintain smooth, consistent speed across 60Hz/120Hz displays
        const dt = Math.min((timestamp - lastTime) / 16.67, 2) || 1;
        lastTime = timestamp;

        ctx.clearRect(0, 0, canvasW, canvasH);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const particleElapsed = elapsed - p.delay;

          if (particleElapsed <= 0) continue;

          // Pure spring physics simulation (identical to Gazi Jarin's engine)
          // Starts gentle, accelerates with natural inertia, and softly settles
          const moveProgress = Math.min(particleElapsed / 950, 1);
          const easedMove = 1 - Math.pow(1 - moveProgress, 3);

          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;

          // Continuous organic acceleration
          const pullStrength = (0.015 + easedMove * 0.075) * dt;
          p.vx += dx * pullStrength;
          p.vy += dy * pullStrength;

          // Subtle organic breath / turbulence while in flight
          if (moveProgress < 0.96) {
            const breathX = Math.sin((elapsed / 1000) * 2 + p.targetY * 0.08) * 0.25 * dt;
            const breathY = Math.cos((elapsed / 1000) * 2 + p.targetX * 0.08) * 0.25 * dt;
            p.vx += breathX;
            p.vy += breathY;
            p.vx *= Math.pow(0.91, dt);
            p.vy *= Math.pow(0.91, dt);
          } else {
            // Settle cleanly into target
            p.vx *= Math.pow(0.80, dt);
            p.vy *= Math.pow(0.80, dt);
            if (Math.abs(dx) < 0.25 && Math.abs(dy) < 0.25) {
              p.x = p.targetX;
              p.y = p.targetY;
              p.vx = 0;
              p.vy = 0;
            }
          }

          p.x += p.vx * dt;
          p.y += p.vy * dt;

          const currentAlpha = Math.min(particleElapsed / 180, 1);

          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // STEP 1: While atoms are converging into position (~750ms), begin crossfading real picture IN
        if (elapsed > 750 && !imageFadeStarted) {
          imageFadeStarted = true;
          setImageOpacity(1);
        }

        // STEP 2: Once atoms have reached their target (~1150ms), gently fade canvas OUT
        if (elapsed > 1150 && !canvasFadeStarted) {
          canvasFadeStarted = true;
          setCanvasOpacity(0);
        }

        // STEP 3: Animation complete, cleanly unmount canvas
        if (elapsed > 1650) {
          setShowCanvas(false);
          return;
        }

        animFrameId = requestAnimationFrame(render);
      };

      animFrameId = requestAnimationFrame(render);
    } catch (err) {
      console.error("Portrait animation error:", err);
      setImageOpacity(1);
      setShowCanvas(false);
    }
    };

    if (img.complete) {
      initAnimation();
    } else {
      img.onload = initAnimation;
    }

    const safetyTimer = setTimeout(() => {
      setImageOpacity(1);
    }, 2200);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
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
