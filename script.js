// =========================================================
// H&S WebCraft | script.js
// =========================================================

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Portfolio Filtering
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.remove(
                'bg-slate-900', 'border', 'border-slate-800', 'text-slate-300'
            );
            btn.classList.add(
                'bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/20'
            );
        } else {
            btn.classList.remove(
                'bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/20'
            );
            btn.classList.add(
                'bg-slate-900', 'border', 'border-slate-800', 'text-slate-300'
            );
        }
    });

    cards.forEach(card => {
        if (
            category === 'all' ||
            card.getAttribute('data-category') === category
        ) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal Controls
function openModal(title, desc, imgSrc, category) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = desc;
    document.getElementById('modalImage').src = imgSrc;
    document.getElementById('modalCategory').innerText = category;

    const modal = document.getElementById('projectModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');

    if (modal && e.target === modal) {
        closeModal();
    }
});

// Lead Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const bType = document.getElementById('businessType').value;
    const msg = document.getElementById('clientMessage').value;

    // Hide form and show success box
    document.getElementById('leadForm').classList.add('hidden');
    document.getElementById('successBox').classList.remove('hidden');

    console.log(`Lead Received: ${name}, ${phone}, ${bType}, ${msg}`);
}

function resetForm() {
    document.getElementById('leadForm').reset();
    document.getElementById('successBox').classList.add('hidden');
    document.getElementById('leadForm').classList.remove('hidden');
}

// =========================================================
// ANIMATIONS
// =========================================================
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {

        /* ---------- 1. Progress bar, header state, back-to-top ---------- */
        var bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.appendChild(bar);

        var toTop = document.createElement('button');
        toTop.id = 'to-top';
        toTop.setAttribute('aria-label', 'Back to top');
        toTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(toTop);

        var header = document.querySelector('header.fixed');
        var ticking = false;

        function onScroll() {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            var pct = max > 0 ? window.scrollY / max : 0;
            bar.style.transform = 'scaleX(' + pct + ')';
            toTop.style.setProperty('--p', (pct * 100).toFixed(1));
            toTop.classList.toggle('show', window.scrollY > 600);
            if (header) header.classList.toggle('scrolled', window.scrollY > 20);
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(onScroll);
                ticking = true;
            }
        }, { passive: true });
        onScroll();

        /* ---------- 2. Add effect classes ---------- */
        document.querySelectorAll(
            'a[class*="bg-brand-600"], a[class*="bg-emerald-600"], a[class*="bg-sky-600"], button[type="submit"]'
        ).forEach(function (el) { el.classList.add('btn-shine'); });

        document.querySelectorAll('section .grid > [class*="rounded-3xl"], section .grid > [class*="rounded-2xl"]')
            .forEach(function (el) { el.classList.add('lift'); });

        if (reduceMotion) return; // people who prefer less motion stop here

        /* ---------- 3. Hero entrance + floating hero card ---------- */
        var firstSection = document.querySelector('section');
        if (firstSection) {
            var heroBlock = firstSection.querySelector('[class*="space-y-6"]');
            if (heroBlock) {
                Array.prototype.forEach.call(heroBlock.children, function (child, i) {
                    child.classList.add('hero-in');
                    child.style.animationDelay = (i * 120) + 'ms';
                });
            }
            var heroCard = firstSection.querySelector('[class*="max-w-md"]');
            if (heroCard) heroCard.classList.add('tilt-card', 'float-slow');
        }

        /* ---------- 4. Hero particles (network of dots) ---------- */
        if (firstSection) {
            var canvas = document.createElement('canvas');
            canvas.id = 'hero-canvas';
            firstSection.insertBefore(canvas, firstSection.firstChild);
            var ctx = canvas.getContext('2d');
            var w = 0, h = 0, pts = [], visible = true, looping = false;
            var dpr = Math.min(window.devicePixelRatio || 1, 2);

            var resize = function () {
                var r = firstSection.getBoundingClientRect();
                w = r.width; h = r.height;
                canvas.width = w * dpr; canvas.height = h * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                var n = Math.min(70, Math.round(w * h / 16000));
                pts = [];
                for (var i = 0; i < n; i++) {
                    pts.push({
                        x: Math.random() * w, y: Math.random() * h,
                        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
                        r: Math.random() * 1.5 + 0.6
                    });
                }
            };

            var frame = function () {
                ctx.clearRect(0, 0, w, h);
                for (var i = 0; i < pts.length; i++) {
                    var p = pts[i];
                    p.x += p.vx; p.y += p.vy;
                    if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
                    if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(165, 180, 252, .7)';
                    ctx.fill();
                    for (var j = i + 1; j < pts.length; j++) {
                        var q = pts[j];
                        var dx = p.x - q.x, dy = p.y - q.y;
                        var d = Math.sqrt(dx * dx + dy * dy);
                        if (d < 120) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(q.x, q.y);
                            ctx.strokeStyle = 'rgba(129, 140, 248,' + ((1 - d / 120) * 0.28) + ')';
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }
                if (visible && !document.hidden) window.requestAnimationFrame(frame);
                else looping = false;
            };

            var start = function () {
                if (!looping) { looping = true; window.requestAnimationFrame(frame); }
            };

            resize();
            start();
            window.addEventListener('resize', resize);
            document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });
            if ('IntersectionObserver' in window) {
                new IntersectionObserver(function (entries) {
                    visible = entries[0].isIntersecting;
                    if (visible) start();
                }).observe(firstSection);
            }
        }

        /* ---------- 5. Scroll reveal (stagger + left/right on 2-column rows) ---------- */
        var targets = [];
        document.querySelectorAll('section').forEach(function (section, sIndex) {
            if (sIndex === 0) return;

            section.querySelectorAll(':scope > div > .text-center, :scope > div > div > .text-center').forEach(function (el) {
                targets.push({ el: el, delay: 0, dir: '' });
            });

            section.querySelectorAll('.grid').forEach(function (grid) {
                var twoCol = /lg:grid-cols-12/.test(grid.className) && grid.children.length === 2;
                Array.prototype.forEach.call(grid.children, function (child, i) {
                    targets.push({
                        el: child,
                        delay: twoCol ? 0 : Math.min(i, 5) * 90,
                        dir: twoCol ? (i === 0 ? 'left' : 'right') : ''
                    });
                });
            });

            section.querySelectorAll('details').forEach(function (el, i) {
                targets.push({ el: el, delay: Math.min(i, 5) * 80, dir: '' });
            });
            section.querySelectorAll(':scope > div[class*="max-w-3xl"][class*="text-center"]').forEach(function (el) {
                targets.push({ el: el, delay: 0, dir: '' });
            });
        });

        var seen = new Set();
        var toObserve = [];
        targets.forEach(function (t) {
            if (seen.has(t.el)) return;
            seen.add(t.el);
            if (t.el.getBoundingClientRect().top < window.innerHeight * 0.92) return; // already on screen
            t.el.classList.add('reveal');
            if (t.dir) t.el.classList.add('reveal-' + t.dir);
            t.el.style.transitionDelay = t.delay + 'ms';
            toObserve.push(t.el);
        });

        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var el = entry.target;
                    el.classList.add('in');
                    io.unobserve(el);
                    setTimeout(function () {
                        el.classList.remove('reveal', 'in', 'reveal-left', 'reveal-right');
                        el.style.transitionDelay = '';
                    }, 1400);
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            toObserve.forEach(function (el) { io.observe(el); });
        } else {
            toObserve.forEach(function (el) { el.classList.add('in'); });
        }

        /* ---------- 6. Number counters (5, 2h, 95+, 1 yr, and prices like ₹9,999) ---------- */
        var counters = [];
        document.querySelectorAll('.text-4xl.font-extrabold, .text-3xl.font-extrabold').forEach(function (el) {
            if (el.children.length) return;
            var m = el.textContent.trim().match(/^(₹?)(\d[\d,]*)(.*)$/);
            if (!m) return;
            counters.push({
                el: el, prefix: m[1], end: parseInt(m[2].replace(/,/g, ''), 10),
                comma: m[2].indexOf(',') > -1, suffix: m[3]
            });
        });

        function fmt(c, n) {
            return c.prefix + (c.comma ? n.toLocaleString('en-IN') : n) + c.suffix;
        }
        function runCounter(c) {
            var duration = 1400, startTs = null;
            function step(ts) {
                if (!startTs) startTs = ts;
                var p = Math.min((ts - startTs) / duration, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                c.el.textContent = fmt(c, Math.round(c.end * eased));
                if (p < 1) window.requestAnimationFrame(step);
            }
            window.requestAnimationFrame(step);
        }

        if (counters.length && 'IntersectionObserver' in window) {
            var cio = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var c = counters.find(function (x) { return x.el === entry.target; });
                    if (c) runCounter(c);
                    cio.unobserve(entry.target);
                });
            }, { threshold: 0.6 });
            counters.forEach(function (c) {
                c.el.textContent = fmt(c, 0);
                cio.observe(c.el);
            });
        }

        /* ---------- 7. Button ripple on click ---------- */
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('.btn-shine');
            if (!btn) return;
            var r = btn.getBoundingClientRect();
            var size = Math.max(r.width, r.height);
            var span = document.createElement('span');
            span.className = 'ripple';
            span.style.width = span.style.height = size + 'px';
            span.style.left = (e.clientX - r.left - size / 2) + 'px';
            span.style.top = (e.clientY - r.top - size / 2) + 'px';
            btn.appendChild(span);
            setTimeout(function () { span.remove(); }, 650);
        });

        /* ---------- 8. Page transition (fade out before opening another page) ---------- */
        document.addEventListener('click', function (e) {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            var a = e.target.closest('a[href]');
            if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
            var u;
            try { u = new URL(a.href, window.location.href); } catch (err) { return; }
            if (u.protocol !== window.location.protocol || u.host !== window.location.host) return;
            if (u.pathname === window.location.pathname && u.search === window.location.search) return; // same page / #anchor
            e.preventDefault();
            document.documentElement.classList.add('leaving');
            setTimeout(function () { window.location.href = a.href; }, 350);
        });
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) document.documentElement.classList.remove('leaving');
        });

        /* ---------- 9. Mouse effects (desktop only): cursor glow, spotlight, tilt, magnetic ---------- */
        if (!finePointer) return;

        var glow = document.createElement('div');
        glow.id = 'cursor-glow';
        document.body.appendChild(glow);
        var gx = 0, gy = 0, gTick = false;

        var currentCard = null;
        var currentBtn = null;

        function resetCard(card) {
            if (!card) return;
            card.style.transform = '';
            card.classList.remove('tilting');
        }
        function resetBtn(btn) {
            if (!btn) return;
            btn.style.translate = '';
        }

        document.addEventListener('mousemove', function (e) {
            // cursor glow
            gx = e.clientX; gy = e.clientY;
            if (!gTick) {
                gTick = true;
                window.requestAnimationFrame(function () {
                    glow.style.transform = 'translate3d(' + gx + 'px,' + gy + 'px,0)';
                    glow.style.opacity = '1';
                    gTick = false;
                });
            }

            // card spotlight + tilt
            var card = e.target.closest('.lift, .tilt-card');
            if (currentCard && currentCard !== card) resetCard(currentCard);
            currentCard = card;
            if (card) {
                var r = card.getBoundingClientRect();
                var x = e.clientX - r.left, y = e.clientY - r.top;
                card.style.setProperty('--mx', x + 'px');
                card.style.setProperty('--my', y + 'px');
                var canTilt = r.width < 520 && !card.querySelector('input, textarea, select');
                if (canTilt) {
                    var rx = (0.5 - y / r.height) * 8;
                    var ry = (x / r.width - 0.5) * 8;
                    var lift = card.classList.contains('lift') ? -6 : 0;
                    card.classList.add('tilting');
                    card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(' + lift + 'px)';
                }
            }

            // magnetic buttons (only buttons outside cards)
            var btn = e.target.closest('.btn-shine');
            if (btn && btn.closest('.lift')) btn = null;
            if (currentBtn && currentBtn !== btn) resetBtn(currentBtn);
            currentBtn = btn;
            if (btn) {
                var b = btn.getBoundingClientRect();
                var dx = e.clientX - (b.left + b.width / 2);
                var dy = e.clientY - (b.top + b.height / 2);
                btn.classList.add('magnetic');
                btn.style.translate = (dx * 0.2).toFixed(1) + 'px ' + (dy * 0.3).toFixed(1) + 'px';
            }
        });

        document.documentElement.addEventListener('mouseleave', function () {
            glow.style.opacity = '0';
            resetCard(currentCard); currentCard = null;
            resetBtn(currentBtn); currentBtn = null;
        });
    });
})();