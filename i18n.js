// i18n.js — Language toggle for portfolio
(function() {
    'use strict';

    function getLang() {
        return localStorage.getItem('portfolio-lang') || 'vi';
    }

    function setLang(lang) {
        localStorage.setItem('portfolio-lang', lang);
    }

    function applyLang(lang) {
        // Update all elements with data-vi and data-en
        document.querySelectorAll('[data-vi][data-en]').forEach(function(el) {
            var text = el.getAttribute('data-' + lang);
            if (text !== null) {
                // Preserve innerHTML for elements with nested HTML
                if (el.hasAttribute('data-html')) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Update toggle button text
        var btn = document.querySelector('.nav__lang');
        if (btn) {
            btn.textContent = lang === 'vi' ? 'EN' : 'VN';
            btn.setAttribute('title', lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt');
        }

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    window.toggleLang = function() {
        var current = getLang();
        var next = current === 'vi' ? 'en' : 'vi';
        setLang(next);
        applyLang(next);
    };

    // Apply saved language on page load
    document.addEventListener('DOMContentLoaded', function() {
        var lang = getLang();
        if (lang !== 'vi') {
            applyLang(lang);
        }
    });
})();
