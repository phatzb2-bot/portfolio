/* ================================================
   PORTFOLIO — NGUYEN HUY PHAT
   Interactive JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initScrollReveal();
    initCounterAnimation();
    initSmoothScroll();
    initParallax();
    initParticles();
});

/* ---------- Navigation Scroll Effect ---------- */
function initNavScroll() {
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

/* ---------- Scroll Reveal Animation ---------- */
function initScrollReveal() {
    // Add 'reveal' class to elements that should animate
    const revealSelectors = [
        '.pillar',
        '.project-card',
        '.cs__section',
        '.service-card',
        '.timeline__item',
        '.skill-group',
        '.testimonial-card',
        '.education__card',
        '.section__title',
        '.about__intro',
        '.cs__results-bar',
        '.cs__gallery-group',
        '.partner-card',
        '.takeaway',
        '.cs-challenge',
        '.cs-results__card',
        '.cs-results__highlight',
        '.cs-campaign',
        '.cs-takeaway',
        '.cs-section__header'
    ];
    
    const elements = document.querySelectorAll(revealSelectors.join(', '));
    elements.forEach((el, i) => {
        el.classList.add('reveal');
        // More organic stagger: vary by section groups
        const delay = (i % 6) * 0.08;
        el.style.transitionDelay = `${delay}s`;
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

/* ---------- Counter Animation ---------- */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(el => observer.observe(el));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    if (isNaN(target)) return;
    
    // Find the number display element — support both main page and case study subpage classes
    let numberEl = element.querySelector('.metric__number, .cs__result-number, .cs-results__number');
    if (!numberEl) {
        // The element itself might be the number display
        const numberClasses = ['metric__number', 'cs__result-number', 'cs-results__number'];
        if (numberClasses.some(cls => element.classList.contains(cls))) {
            numberEl = element;
        } else {
            return;
        }
    }
    
    const duration = 2000;
    const start = performance.now();
    
    function step(ts) {
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        numberEl.textContent = formatNumber(current) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
    }
    return num.toString();
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80; // nav height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ---------- Parallax Effect ---------- */
function initParallax() {
    // Portrait parallax removed — CSS handles positioning
    // Glow mousemove removed — CSS glowBreath animation handles movement
}

/* ---------- Hero Particle System ---------- */
function initParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    const particles = [];
    const PARTICLE_COUNT = 60;
    
    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    
    function createParticle() {
        const isGreen = Math.random() > 0.7;
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: -(Math.random() * 0.4 + 0.1),
            opacity: Math.random() * 0.4 + 0.1,
            color: isGreen ? '74, 222, 128' : '255, 255, 255',
            life: Math.random() * 200 + 100,
            maxLife: 0,
        };
    }
    
    function init() {
        resize();
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = createParticle();
            p.maxLife = p.life;
            particles.push(p);
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;
            
            const lifeRatio = p.life / p.maxLife;
            const currentOpacity = p.opacity * lifeRatio;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${currentOpacity})`;
            ctx.fill();
            
            // Subtle glow
            if (p.size > 1) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${currentOpacity * 0.1})`;
                ctx.fill();
            }
            
            if (p.life <= 0 || p.y < -10 || p.x < -10 || p.x > width + 10) {
                const np = createParticle();
                np.y = height + 10;
                np.maxLife = np.life;
                particles[i] = np;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    window.addEventListener('resize', () => {
        resize();
    });
}
