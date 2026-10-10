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

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {

        /* ---------- 1. Scroll progress bar + header state ---------- */
        var bar = document.createElement('div');
        bar.id = 'scroll-progress';
        document.body.appendChild(bar);

        var header = document.querySelector('header.fixed');
        var ticking = false;

        function onScroll() {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            var pct = max > 0 ? window.scrollY / max : 0;
            bar.style.transform = 'scaleX(' + pct + ')';
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

        /* ---------- 2. Button shine + card lift (hover effects) ---------- */
        document.querySelectorAll(
            'a[class*="bg-brand-600"], a[class*="bg-emerald-600"], a[class*="bg-sky-600"], button[type="submit"]'
        ).forEach(function (el) {
            if (!el.closest('header') || el.href) el.classList.add('btn-shine');
        });

        document.querySelectorAll('section .grid > [class*="rounded-3xl"], section .grid > [class*="rounded-2xl"]')
            .forEach(function (el) { el.classList.add('lift'); });

        if (reduceMotion) return; // stop here for people who prefer less motion

        /* ---------- 3. Hero entrance (once, on load) ---------- */
        var firstSection = document.querySelector('section');
        if (firstSection) {
            var heroBlock = firstSection.querySelector('[class*="space-y-6"]');
            if (heroBlock) {
                Array.prototype.forEach.call(heroBlock.children, function (child, i) {
                    child.classList.add('hero-in');
                    child.style.animationDelay = (i * 110) + 'ms';
                });
            }
        }

        /* ---------- 4. Scroll reveal with stagger ---------- */
        var targets = [];
        document.querySelectorAll('section').forEach(function (section, sIndex) {
            if (sIndex === 0) return; // hero is handled above

            // section heading blocks
            section.querySelectorAll(':scope > div > .text-center, :scope > div > div > .text-center').forEach(function (el) {
                targets.push({ el: el, delay: 0 });
            });

            // grid children (cards) with stagger
            section.querySelectorAll('.grid').forEach(function (grid) {
                Array.prototype.forEach.call(grid.children, function (child, i) {
                    if (child.closest('.reveal') && child.closest('.reveal') !== child) return;
                    targets.push({ el: child, delay: Math.min(i, 5) * 90 });
                });
            });

            // standalone blocks (FAQ items, CTA)
            section.querySelectorAll('details').forEach(function (el, i) {
                targets.push({ el: el, delay: Math.min(i, 5) * 80 });
            });
            section.querySelectorAll(':scope > div[class*="max-w-3xl"][class*="text-center"]').forEach(function (el) {
                targets.push({ el: el, delay: 0 });
            });
        });

        var seen = new Set();
        var toObserve = [];
        targets.forEach(function (t) {
            if (seen.has(t.el)) return;
            seen.add(t.el);
            // do not hide things that are already on screen at load
            if (t.el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
            t.el.classList.add('reveal');
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
                    // clean up after the animation so hover effects are not affected
                    setTimeout(function () {
                        el.classList.remove('reveal', 'in');
                        el.style.transitionDelay = '';
                    }, 1200);
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            toObserve.forEach(function (el) { io.observe(el); });
        } else {
            toObserve.forEach(function (el) { el.classList.add('in'); });
        }

        /* ---------- 5. Number counters (e.g. "5", "2h", "95+", "1 yr") ---------- */
        var counters = [];
        document.querySelectorAll('.text-4xl.font-extrabold').forEach(function (el) {
            var m = el.textContent.trim().match(/^(\d+)(.*)$/);
            if (!m) return;
            counters.push({ el: el, end: parseInt(m[1], 10), suffix: m[2] });
        });

        function runCounter(c) {
            var duration = 1300;
            var start = null;
            function step(ts) {
                if (!start) start = ts;
                var p = Math.min((ts - start) / duration, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                c.el.textContent = Math.round(c.end * eased) + c.suffix;
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
                c.el.textContent = '0' + c.suffix;
                cio.observe(c.el);
            });
        }
    });
})();