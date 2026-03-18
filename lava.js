// ================================================
// Lava Gradient Background — Animated Canvas
// Organic flowing blobs with metaball-like merging
// ================================================
(function () {
    'use strict';

    const hero = document.querySelector('.hero');
    if (!hero) return;

    // --- Canvas setup ---
    const canvas = document.createElement('canvas');
    canvas.className = 'hero__lava-canvas';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let W, H, dpr;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = hero.offsetWidth;
        H = hero.offsetHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // --- Blob definitions ---
    // Each blob: { x, y } = center ratio (0-1), r = radius ratio,
    // color = [r,g,b], sx/sy = speed multipliers, ox/oy = phase offsets
    const blobs = [
        // Deep blue pools (bottom area)
        { x: 0.18, y: 0.78, r: 0.32, color: [0, 50, 200],   sx: 0.23, sy: 0.18, ox: 0,    oy: 0.5  },
        { x: 0.55, y: 0.82, r: 0.30, color: [0, 70, 180],   sx: -0.18, sy: 0.14, ox: 1.2,  oy: 1.8  },
        { x: 0.82, y: 0.75, r: 0.26, color: [0, 40, 160],   sx: 0.15, sy: -0.20, ox: 2.5,  oy: 0.3  },

        // Teal / cyan accents
        { x: 0.35, y: 0.72, r: 0.18, color: [0, 120, 140],  sx: -0.12, sy: 0.22, ox: 3.1,  oy: 2.0  },
        { x: 0.68, y: 0.68, r: 0.16, color: [0, 100, 150],  sx: 0.20, sy: 0.10, ox: 0.7,  oy: 3.5  },

        // Orange / fire edge (creates lava "surface" boundary)
        { x: 0.10, y: 0.52, r: 0.28, color: [255, 90, 0],   sx: 0.30, sy: 0.12, ox: 0.4,  oy: 1.0  },
        { x: 0.42, y: 0.48, r: 0.25, color: [255, 120, 10],  sx: -0.22, sy: 0.16, ox: 2.0,  oy: 0.8  },
        { x: 0.75, y: 0.50, r: 0.24, color: [255, 70, 0],   sx: 0.18, sy: -0.14, ox: 1.5,  oy: 2.5  },
        { x: 0.95, y: 0.55, r: 0.22, color: [255, 100, 0],  sx: -0.25, sy: 0.20, ox: 3.8,  oy: 0.2  },

        // Yellow / warm highlights
        { x: 0.28, y: 0.60, r: 0.20, color: [255, 180, 30], sx: 0.14, sy: 0.18, ox: 1.8,  oy: 3.0  },
        { x: 0.60, y: 0.58, r: 0.18, color: [255, 160, 20], sx: -0.16, sy: -0.12, ox: 0.3,  oy: 1.5  },

        // Subtle warm glow (blends orange edge into blue)
        { x: 0.15, y: 0.65, r: 0.22, color: [200, 100, 40], sx: 0.10, sy: 0.08, ox: 2.2,  oy: 0.6  },
        { x: 0.85, y: 0.62, r: 0.20, color: [180, 80, 30],  sx: -0.12, sy: 0.15, ox: 0.9,  oy: 2.8  },
    ];

    // --- Animation ---
    function draw(time) {
        const t = time * 0.00025; // Very slow, organic movement

        // Clear to black
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, W, H);

        // Draw each blob as a soft radial gradient
        ctx.globalCompositeOperation = 'screen';

        for (let i = 0; i < blobs.length; i++) {
            const b = blobs[i];

            // Organic movement using sine/cosine with different frequencies
            const bx = (b.x + Math.sin(t * b.sx + b.ox) * 0.12 + Math.sin(t * b.sx * 0.7 + b.ox * 1.3) * 0.05) * W;
            const by = (b.y + Math.cos(t * b.sy + b.oy) * 0.08 + Math.cos(t * b.sy * 0.6 + b.oy * 1.5) * 0.04) * H;
            const radius = b.r * Math.min(W, H) * (1 + Math.sin(t * 0.3 + b.ox) * 0.08);

            const grad = ctx.createRadialGradient(bx, by, 0, bx, by, radius);
            const [cr, cg, cb] = b.color;
            grad.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.95)`);
            grad.addColorStop(0.3, `rgba(${cr}, ${cg}, ${cb}, 0.6)`);
            grad.addColorStop(0.6, `rgba(${cr}, ${cg}, ${cb}, 0.25)`);
            grad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);
        }

        ctx.globalCompositeOperation = 'source-over';

        // Dark vignette overlay on the top half for the deep black look
        const vignetteGrad = ctx.createLinearGradient(0, 0, 0, H * 0.65);
        vignetteGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        vignetteGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.85)');
        vignetteGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.3)');
        vignetteGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = vignetteGrad;
        ctx.fillRect(0, 0, W, H * 0.65);

        requestAnimationFrame(draw);
    }

    // --- Init ---
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
})();
