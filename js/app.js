/* ================================================================
   IndusGames — App Scripts
   Modules: Theme, Dock Nav, Scroll Reveal, Accordion,
            Animated Counters, Copy to Clipboard
   ================================================================ */

(function () {
    'use strict';

    /* ============================================================
       THEME
       ============================================================ */
    var html = document.documentElement;

    function getTheme() {
        return html.getAttribute('data-theme') || 'dark';
    }

    function applyThemeIcon(theme) {
        var icon = document.getElementById('themeIcon');
        if (icon) icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    window.toggleTheme = function () {
        var next = getTheme() === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('indusgames-theme', next);
        applyThemeIcon(next);
    };

    /* ============================================================
       DOCK NAVIGATION — active state + smooth scroll
       ============================================================ */
    var dockBtns = document.querySelectorAll('.dock-btn[data-section]');
    var sections = [];

    function initSections() {
        sections = [];
        dockBtns.forEach(function (btn) {
            var id = btn.getAttribute('data-section');
            var el = document.getElementById(id);
            if (el) sections.push({ id: id, el: el, btn: btn });
        });
    }

    function updateActiveNav() {
        var scrollY = window.scrollY + window.innerHeight * 0.4;
        var current = sections[0];

        for (var i = sections.length - 1; i >= 0; i--) {
            if (sections[i].el.offsetTop <= scrollY) {
                current = sections[i];
                break;
            }
        }

        dockBtns.forEach(function (b) { b.classList.remove('active'); });
        if (current) current.btn.classList.add('active');
    }

    /* Smooth scroll for dock links */
    dockBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var href = btn.getAttribute('href');
            if (!href || href.charAt(0) !== '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ============================================================
       SCROLL REVEAL (Intersection Observer)
       ============================================================ */
    function initReveal() {
        var reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(function (el) { observer.observe(el); });
    }

    /* ============================================================
       ANIMATED COUNTERS
       ============================================================ */
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        var duration = 1400;
        var start = null;

        function step(ts) {
            if (!start) start = ts;
            var elapsed = ts - start;
            var progress = Math.min(elapsed / duration, 1);
            /* ease-out cubic */
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased);
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    function initCounters() {
        var nums = document.querySelectorAll('.stat-num[data-target]');
        if (!nums.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        nums.forEach(function (el) { observer.observe(el); });
    }

    /* ============================================================
       ACCORDION
       ============================================================ */
    function initAccordion() {
        var triggers = document.querySelectorAll('.accordion-trigger');

        triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function () {
                var item = trigger.closest('.accordion-item');
                var isOpen = item.classList.contains('open');

                /* Close all siblings */
                var parent = item.parentElement;
                parent.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
                    openItem.classList.remove('open');
                    openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
                });

                /* Toggle current */
                if (!isOpen) {
                    item.classList.add('open');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* ============================================================
       COPY TO CLIPBOARD
       ============================================================ */
    window.copyText = function (text, btnEl) {
        if (!btnEl) return;

        function onSuccess() {
            var orig = btnEl.innerHTML;
            /* Distinguish icon-only (widget) vs text button */
            if (btnEl.classList.contains('widget-copy')) {
                btnEl.innerHTML = '<i class="fas fa-check"></i>';
            } else {
                btnEl.textContent = 'Copied!';
                btnEl.classList.add('copied');
            }
            setTimeout(function () {
                btnEl.innerHTML = orig;
                btnEl.classList.remove('copied');
            }, 1800);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
                fallbackCopy(text);
                onSuccess();
            });
        } else {
            fallbackCopy(text);
            onSuccess();
        }
    };

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
    }

    /* ============================================================
       SERVER WIDGET — show/hide on scroll
       ============================================================ */
    function initWidget() {
        var widget = document.getElementById('serverWidget');
        if (!widget) return;

        var lastY = 0;
        window.addEventListener('scroll', function () {
            var y = window.scrollY;
            if (y > 400 && y > lastY) {
                widget.style.opacity = '0';
                widget.style.pointerEvents = 'none';
            } else {
                widget.style.opacity = '1';
                widget.style.pointerEvents = 'auto';
            }
            lastY = y;
        }, { passive: true });
    }

    /* ============================================================
       INIT
       ============================================================ */
    document.addEventListener('DOMContentLoaded', function () {
        applyThemeIcon(getTheme());
        initSections();
        updateActiveNav();
        initReveal();
        initCounters();
        initAccordion();
        initWidget();

        /* Throttled scroll handler for nav highlighting */
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    updateActiveNav();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    });

})();
