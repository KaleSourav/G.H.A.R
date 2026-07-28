import { useEffect, useRef } from 'react';

const FRAME_COUNT = 300;

function frameSrc(n: number): string {
  return `/scroll-frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;
}

export const ScrollAnimationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Hi-DPI / Retina support ──────────────────────────────────────────
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width  = window.innerWidth  * dpr;
      canvas!.height = window.innerHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();

    // ── object-fit: cover draw ──────────────────────────────────────────
    function drawCover(img: HTMLImageElement) {
      if (!img || !img.naturalWidth) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dx = (cw - iw * scale) / 2;
      const dy = (ch - ih * scale) / 2;
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.drawImage(img, dx, dy, iw * scale, ih * scale);
    }

    // ── Pre-load all frames ──────────────────────────────────────────────
    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const idx = i;
      img.onload = () => {
        frames[idx] = img;
        // Draw frame 0 as soon as it loads so there's immediate feedback
        if (idx === 0) drawCover(img);
      };
      img.onerror = () => {
        frames[idx] = null; // skip broken frames
      };
      img.src = frameSrc(i + 1); // files are 001 … 300
    }

    // ── Scroll → target frame ────────────────────────────────────────────
    let currentIndex = 0;
    let targetIndex  = 0;

    function onScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const fraction = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      targetIndex = fraction * (FRAME_COUNT - 1);
    }

    function renderFrame() {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(currentIndex)));
      // Walk backwards/forwards to find the nearest loaded frame
      let frame = frames[idx];
      if (!frame) {
        for (let d = 1; d < 30; d++) {
          if (idx - d >= 0 && frames[idx - d]) { frame = frames[idx - d]; break; }
          if (idx + d < FRAME_COUNT && frames[idx + d]) { frame = frames[idx + d]; break; }
        }
      }
      if (frame) drawCover(frame);
    }

    // ── Smooth render loop (lerp) — starts immediately ──────────────────
    let rafId: number;
    function tick() {
      currentIndex += (targetIndex - currentIndex) * 0.10;
      renderFrame();
      rafId = requestAnimationFrame(tick);
    }
    tick(); // start right away, don't wait for all frames to load

    function onResize() {
      resizeCanvas();
      renderFrame();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
        filter: 'brightness(0.45)',
      }}
    />
  );
};
