/* 砼行智能 — 官网交互脚本 */
(function () {
  'use strict';

  // 顶部导航：滚动后变色
  var header = document.querySelector('.site-header');
  var backTop = document.querySelector('.back-top');

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    if (backTop) backTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 移动端菜单
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (navToggle && mobileMenu) {
    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
    navToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  // 返回顶部
  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 微信二维码弹窗（公众号 / 视频号）
  var mediaModal = null;
  var MEDIA = {
    wechat: {
      img: 'images/wechat-qr.jpg',
      alt: '砼行智能微信公众号二维码',
      title: '关注砼行智能公众号',
      desc: '微信扫一扫，获取最新案例与服务动态'
    },
    video: {
      img: 'images/video-channel-qr.png',
      alt: '砼行智能微信视频号二维码',
      title: '关注砼行智能视频号',
      desc: '微信扫一扫，观看无人机清洗作业实拍'
    }
  };
  function buildMediaModal() {
    var el = document.createElement('div');
    el.className = 'wechat-modal';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
      '<div class="wechat-modal__backdrop"></div>' +
      '<div class="wechat-modal__panel" role="dialog" aria-modal="true" aria-label="微信二维码">' +
        '<button class="wechat-modal__close" type="button" aria-label="关闭">&times;</button>' +
        '<img alt="">' +
        '<h3></h3>' +
        '<p></p>' +
      '</div>';
    document.body.appendChild(el);
    el.querySelector('.wechat-modal__backdrop').addEventListener('click', closeMedia);
    el.querySelector('.wechat-modal__close').addEventListener('click', closeMedia);
    return el;
  }
  function openMedia(key, e) {
    if (e) e.preventDefault();
    var data = MEDIA[key] || MEDIA.wechat;
    if (!mediaModal) mediaModal = buildMediaModal();
    var img = mediaModal.querySelector('img');
    img.src = data.img;
    img.alt = data.alt;
    mediaModal.querySelector('h3').textContent = data.title;
    mediaModal.querySelector('p').textContent = data.desc;
    mediaModal.classList.add('open');
    mediaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeMedia() {
    if (!mediaModal) return;
    mediaModal.classList.remove('open');
    mediaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-wechat],[data-video]');
    if (!trigger) return;
    openMedia(trigger.hasAttribute('data-video') ? 'video' : 'wechat', e);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMedia();
  });

  // 滚动进入视口时的淡入动效
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // 地图（高德瓦片，免密钥）
  var mapEl = document.querySelector('.js-amap');
  if (mapEl) {
    var mapLng = parseFloat(mapEl.getAttribute('data-lng'));
    var mapLat = parseFloat(mapEl.getAttribute('data-lat'));
    var mapZoom = parseInt(mapEl.getAttribute('data-zoom'), 10) || 16;

    var renderMap = function () {
      var w = mapEl.clientWidth;
      var h = mapEl.clientHeight;
      if (!w || !h) return;

      var n = Math.pow(2, mapZoom);
      var px = (mapLng + 180) / 360 * n * 256;
      var rad = mapLat * Math.PI / 180;
      var py = (1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2 * n * 256;

      var left = px - w / 2;
      var top = py - h / 2;
      var tx0 = Math.floor(left / 256), tx1 = Math.floor((left + w) / 256);
      var ty0 = Math.floor(top / 256), ty1 = Math.floor((top + h) / 256);

      var html = '';
      for (var ty = ty0; ty <= ty1; ty++) {
        for (var tx = tx0; tx <= tx1; tx++) {
          var xs = ((tx % n) + n) % n;
          var sub = 1 + (Math.abs(tx + ty) % 4);
          html += '<img class="amap-tile" alt="" ' +
            'src="https://webrd0' + sub + '.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x=' +
            xs + '&y=' + ty + '&z=' + mapZoom + '" ' +
            'style="left:' + (tx * 256 - left) + 'px;top:' + (ty * 256 - top) + 'px">';
        }
      }

      html += '<div class="map-pin" style="left:' + (px - left) + 'px;top:' + (py - top) + 'px">' +
        '<svg width="34" height="44" viewBox="0 0 34 44" fill="none">' +
          '<circle class="pin-pulse" cx="17" cy="40" r="7" fill="#2563EB"/>' +
          '<path d="M17 1C8.7 1 2 7.5 2 15.6 2 26 17 43 17 43s15-17 15-27.4C32 7.5 25.3 1 17 1z" fill="#2563EB" stroke="#fff" stroke-width="2.5"/>' +
          '<circle cx="17" cy="15.5" r="5.2" fill="#fff"/>' +
        '</svg>' +
      '</div>';

      mapEl.innerHTML = html;
    };

    renderMap();
    var mapResizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(mapResizeTimer);
      mapResizeTimer = setTimeout(renderMap, 200);
    });
  }

  // 案例筛选
  var filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    var buttons = filterBar.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('[data-category]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        items.forEach(function (item) {
          var show = filter === 'all' || item.getAttribute('data-category') === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // 联系表单（前端占位提交）
  var form = document.querySelector('.contact-form form');
  if (form) {
    var statusEl = form.querySelector('.form-status');

    var setStatus = function (msg, ok) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = 'form-status ' + (ok ? 'is-ok' : 'is-error');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;

      var payload = {};
      new FormData(form).forEach(function (value, key) { payload[key] = value; });

      btn.disabled = true;
      btn.textContent = '提交中…';
      setStatus('', true);

      fetch('https://formsubmit.co/ajax/1751157014@qq.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && (data.success === 'true' || data.success === true)) {
            form.reset();
            setStatus('提交成功，我们将在 24 小时内与您联系。', true);
          } else {
            throw new Error('submit failed');
          }
        })
        .catch(function () {
          setStatus('提交失败，请直接致电 18989390904 或发送邮件至 1751157014@qq.com。', false);
        })
        .then(function () {
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  }
})();
