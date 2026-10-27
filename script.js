(function () {
  var d = document, r = d.documentElement;
  var nav = d.getElementById('nav'), bg = d.getElementById('bg'), lk = d.getElementById('lk');
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  function onScroll() {
    nav.classList.toggle('s', scrollY > 10);
    var h = r.scrollHeight - innerHeight;
    r.style.setProperty('--p', h > 0 ? Math.min(scrollY / h, 1) : 0);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() { lk.classList.remove('open'); bg.setAttribute('aria-expanded', 'false'); }
  bg.addEventListener('click', function () {
    bg.setAttribute('aria-expanded', lk.classList.toggle('open'));
  });
  lk.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  var rv = d.querySelectorAll('.rv');
  if (hasIO) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });

    var links = [].slice.call(lk.querySelectorAll('a:not(.cvl)'));
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) links.forEach(function (a) {
          a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    d.querySelectorAll('main section').forEach(function (s) { so.observe(s); });
  } else rv.forEach(function (el) { el.classList.add('in'); });

  // Project videos: play while in view (muted), pause when off-screen; button toggles
  var vids = d.querySelectorAll('.thumb video');
  vids.forEach(function (v) {
    var btn = v.parentNode.querySelector('.pp'), manual = false;
    function sync() { btn.textContent = v.paused ? '▶' : '❚❚'; }
    btn.addEventListener('click', function () {
      manual = true;
      if (v.paused) v.play().catch(function () {}); else v.pause();
    });
    v.addEventListener('play', sync); v.addEventListener('pause', sync);
    if (hasIO && !reduce) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !manual) v.play().catch(function () {});
          else if (!e.isIntersecting) v.pause();
        });
      }, { threshold: 0.5 }).observe(v);
    }
  });

  // Cursor-following grid highlight (fine pointers only)
  if (!reduce && matchMedia('(pointer:fine)').matches) {
    var raf;
    addEventListener('pointermove', function (e) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        r.style.setProperty('--x', e.clientX + 'px');
        r.style.setProperty('--y', e.clientY + 'px');
      });
    }, { passive: true });
  }

  // Copy email
  var t = d.getElementById('toast');
  function say(m) { t.textContent = m; t.classList.add('on'); setTimeout(function () { t.classList.remove('on'); }, 2000); }
  d.getElementById('cp').addEventListener('click', function () {
    var m = 'beqirinderon@gmail.com';
    if (navigator.clipboard) navigator.clipboard.writeText(m).then(function () { say('Email copied'); }, function () { say('Copy failed: ' + m); });
    else say('Copy failed: ' + m);
  });
})();