// ============================================================
// DotGrid.tsx
// Canvas-based interactive dot grid with proximity color glow,
// cursor tracking, and click shockwave. No GSAP dependency.
// ============================================================

import { useRef, useEffect, useCallback, useMemo, memo } from 'react';
import './DotGrid.css';

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

interface Dot {
  cx: number; cy: number;
  xOffset: number; yOffset: number;
  // shock animation state
  sx: number; sy: number; sv: number; returning: boolean;
}

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  shockRadius?: number;
  shockStrength?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DotGrid = memo(({
  dotSize = 5,
  gap = 15,
  baseColor = '#2F293A',
  activeColor = '#5227FF',
  proximity = 120,
  shockRadius = 250,
  shockStrength = 5,
  returnDuration = 1.5,
  className = '',
  style,
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const shocksRef = useRef<{ cx: number; cy: number; time: number }[]>([]);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, sx: 0, sy: 0, sv: 0, returning: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  // Main draw loop
  useEffect(() => {
    let rafId: number;
    const proxSq = proximity * proximity;
    const halfDot = dotSize / 2;
    const returnSpeed = 1 / (returnDuration * 60); // per-frame return ratio at ~60fps

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const { x: px, y: py } = pointerRef.current;
      const now = performance.now();

      // Process shockwaves
      const shocks = shocksRef.current;
      for (let si = shocks.length - 1; si >= 0; si--) {
        const elapsed = (now - shocks[si].time) / 1000;
        if (elapsed > returnDuration + 0.3) {
          shocks.splice(si, 1);
        }
      }

      for (const dot of dotsRef.current) {
        // Shock displacement
        let totalSx = 0, totalSy = 0;
        for (const shock of shocks) {
          const sdx = dot.cx - shock.cx;
          const sdy = dot.cy - shock.cy;
          const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
          if (sdist < shockRadius) {
            const elapsed = (now - shock.time) / 1000;
            const falloff = Math.max(0, 1 - sdist / shockRadius);
            const decay = Math.max(0, 1 - elapsed / returnDuration);
            const ease = decay * decay; // quadratic ease-out
            totalSx += (sdx / (sdist || 1)) * shockStrength * falloff * ease * 20;
            totalSy += (sdy / (sdist || 1)) * shockStrength * falloff * ease * 20;
          }
        }

        // Return offset smoothly to 0
        dot.xOffset += (totalSx - dot.xOffset) * Math.min(returnSpeed * 4, 0.15);
        dot.yOffset += (totalSy - dot.yOffset) * Math.min(returnSpeed * 4, 0.15);

        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;

        // Proximity color
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let fillStyle = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          fillStyle = `rgb(${r},${g},${b})`;
        }

        ctx.beginPath();
        ctx.arc(ox, oy, halfDot, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, dotSize, shockRadius, shockStrength, returnDuration]);

  // Resize observer
  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  // Mouse tracking + click handler
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    };

    const onClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      shocksRef.current.push({
        cx: e.clientX - rect.left,
        cy: e.clientY - rect.top,
        time: performance.now(),
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
});

DotGrid.displayName = 'DotGrid';
export default DotGrid;
