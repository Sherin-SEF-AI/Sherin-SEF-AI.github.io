/* Sherin Joseph Roy portfolio
   nav · theme · work filter · video modal · reveal · analytics */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- deep link ------------------------------------------------------
     `scroll-behavior: smooth` also animates the browser's initial jump to a
     fragment. Over a long page that leaves the visitor mid-flight with the
     reveal observer yet to fire. Land instantly instead, then restore. */

  (function () {
    if (!location.hash) return;
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { return; }
    var target = id && document.getElementById(id);
    if (!target) return;                       /* e.g. #work=re is not an id */
    var root = document.documentElement, prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    target.scrollIntoView();
    root.style.scrollBehavior = prev;
  })();

  /* ---- theme ---------------------------------------------------------- */

  var toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      toggle.setAttribute('aria-label', next === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    });
  }

  /* ---- nav ------------------------------------------------------------ */

  var nav      = document.querySelector('.nav');
  var navBtn   = document.querySelector('.nav__toggle');
  var navLinks = document.querySelector('.nav__links');

  if (navBtn && navLinks) {
    navBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('open');
        navBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var spy = [].slice.call(document.querySelectorAll('.nav__links a[href^="#"]'))
    .map(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      return el ? { a: a, el: el } : null;
    })
    .filter(Boolean);

  var ticking = false;
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 12);
    if (spy.length) {
      var y = window.scrollY + 120, current = null;
      for (var i = 0; i < spy.length; i++) {
        if (spy[i].el.offsetTop <= y) current = spy[i];
      }
      spy.forEach(function (s) { s.a.classList.toggle('active', s === current); });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---- work filter ---------------------------------------------------- */

  var chips = [].slice.call(document.querySelectorAll('.chip'));
  var cards = [].slice.call(document.querySelectorAll('.work-grid .card'));
  var empty = document.querySelector('.work-empty');

  function applyFilter(cat, push) {
    var shown = 0;
    cards.forEach(function (c) {
      var match = cat === 'all' || c.getAttribute('data-cat') === cat;
      c.hidden = !match;
      if (match) shown++;
    });
    chips.forEach(function (ch) {
      ch.setAttribute('aria-pressed', ch.getAttribute('data-filter') === cat ? 'true' : 'false');
    });
    if (empty) empty.hidden = shown > 0;
    if (push) {
      history.replaceState(null, '',
        cat === 'all' ? location.pathname + location.search : '#work=' + cat);
    }
  }

  if (chips.length) {
    chips.forEach(function (ch) {
      ch.addEventListener('click', function () {
        applyFilter(ch.getAttribute('data-filter'), true);
      });
    });
    var m = /(?:^|#|&)work=([a-z]+)/.exec(location.hash);
    applyFilter(m && chips.some(function (c) { return c.getAttribute('data-filter') === m[1]; }) ? m[1] : 'all', false);
  }

  /* ---- video modal ---------------------------------------------------- */

  var modal  = document.getElementById('video-modal');
  var frame  = document.getElementById('video-modal-frame');
  var mTitle = document.getElementById('video-modal-title');
  var lastTrigger = null;

  function openVideo(id, title, trigger) {
    if (!modal || !frame) return;
    lastTrigger = trigger || null;
    frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
    if (mTitle) mTitle.textContent = title || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var close = modal.querySelector('.modal__close');
    if (close) close.focus();
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'video_play', { video_id: id, video_title: title });
    }
  }

  function closeVideo() {
    if (!modal || !frame) return;
    frame.src = '';                       /* stops audio */
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
  }

  document.addEventListener('click', function (e) {
    var v = e.target.closest('[data-video]');
    if (v) {
      e.preventDefault();
      openVideo(v.getAttribute('data-video'), v.getAttribute('data-title'), v);
      return;
    }
    if (e.target.closest('[data-close-modal]') || e.target === modal) closeVideo();
  });

  document.addEventListener('keydown', function (e) {
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') { closeVideo(); return; }
    if (e.key === 'Tab') {                                   /* focus trap */
      var f = modal.querySelectorAll('button, a[href], iframe');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---- reveal --------------------------------------------------------- */

  var targets = [].slice.call(document.querySelectorAll('.reveal'));
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (t) { t.classList.add('visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (!en.isIntersecting) return;
        en.target.style.transitionDelay = Math.min(i, 6) * 60 + 'ms';
        en.target.classList.add('visible');
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }


  /* ---- analytics ------------------------------------------------------ */

  if (typeof window.gtag === 'function') {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="http"]');
      if (!a || a.hostname === location.hostname) return;
      window.gtag('event', 'outbound_click', {
        link_url: a.href, link_domain: a.hostname, transport_type: 'beacon'
      });
    });

    if ('IntersectionObserver' in window) {
      var seen = {};
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting || seen[en.target.id]) return;
          seen[en.target.id] = true;
          window.gtag('event', 'section_view', { section_id: en.target.id });
        });
      }, { threshold: 0.4 });
      [].slice.call(document.querySelectorAll('section[id]')).forEach(function (s) { sio.observe(s); });
    }
  }
})();
