(function () {
  'use strict';

  var BASE_URL = (function () {
    try {
      var scripts = document.querySelectorAll('script[src*="widget/reviews"]');
      if (scripts.length > 0) {
        return new URL(scripts[scripts.length - 1].src).origin;
      }
    } catch (e) { /* ignore */ }
    return 'https://online-offerten.ch';
  })();
  var API_PATH = '/api/widget/reviews/';

  var containers = document.querySelectorAll(
    '[data-oo-partner-id], #online-offerten-reviews, #online-offerten-badge'
  );

  if (!containers.length) return;

  containers.forEach(function (container) {
    if (container.shadowRoot || container.getAttribute('data-oo-rendered')) return;
    container.setAttribute('data-oo-rendered', 'true');

    var partnerId =
      container.getAttribute('data-oo-partner-id') ||
      container.getAttribute('data-partner-id');
    if (!partnerId) return;

    var type = container.getAttribute('data-type') || 'list';
    var limit = container.getAttribute('data-limit') || '5';
    var theme = container.getAttribute('data-theme') || 'light';
    var lang = container.getAttribute('data-lang') || 'de';
    var position = container.getAttribute('data-position') || 'right';
    var autoplay = container.getAttribute('data-autoplay') !== 'false';

    if (container.id === 'online-offerten-badge') type = 'badge';

    var fetchType = (type === 'floating' || type === 'carousel') ? 'list' : type;
    var apiUrl =
      BASE_URL + API_PATH + encodeURIComponent(partnerId) +
      '?limit=' + limit + '&type=' + fetchType;

    fetch(apiUrl)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.partner) return;
        renderWidget(container, data, type, theme, lang, position, autoplay);
      })
      .catch(function () {});
  });

  /* ─── Shared Helpers ─── */

  function renderStars(rating, size) {
    size = size || 16;
    var full = Math.floor(rating);
    var hasHalf = (rating % 1) >= 0.25;
    var html = '';
    for (var i = 0; i < 5; i++) {
      if (i < full) {
        html += starSVG(size, '#FBBF24', '#FBBF24');
      } else if (i === full && hasHalf) {
        html += halfStarSVG(size);
      } else {
        html += starSVG(size, 'none', '#D1D5DB');
      }
    }
    return html;
  }

  function starSVG(size, fill, stroke) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }

  function halfStarSVG(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" style="display:inline-block;vertical-align:middle;">' +
      '<defs><linearGradient id="oo-half-' + size + '"><stop offset="50%" stop-color="#FBBF24"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs>' +
      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#oo-half-' + size + ')" stroke="#D1D5DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    return d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function getTexts(lang) {
    var texts = {
      de: {
        verifiedBy: 'Verifizierte Bewertungen von',
        reviews: 'Bewertungen',
        allReviews: 'Alle Bewertungen lesen',
        price: 'Preiseinhaltung',
        workflow: 'Arbeitsablauf',
        admin: 'Administration',
        outOf: 'von 5',
        noReviews: 'Noch keine Bewertungen vorhanden.',
      },
      fr: {
        verifiedBy: 'Avis vérifiés de',
        reviews: 'avis',
        allReviews: 'Lire tous les avis',
        price: 'Respect du prix',
        workflow: 'Déroulement',
        admin: 'Administration',
        outOf: 'sur 5',
        noReviews: 'Aucun avis pour le moment.',
      },
      it: {
        verifiedBy: 'Recensioni verificate da',
        reviews: 'recensioni',
        allReviews: 'Leggi tutte le recensioni',
        price: 'Rispetto del prezzo',
        workflow: 'Svolgimento',
        admin: 'Amministrazione',
        outOf: 'su 5',
        noReviews: 'Nessuna recensione al momento.',
      },
    };
    return texts[lang] || texts.de;
  }

  function getStyles(theme) {
    var isDark = theme === 'dark';
    return {
      bg: isDark ? '#1F2937' : '#FFFFFF',
      bgCard: isDark ? '#374151' : '#F9FAFB',
      text: isDark ? '#F9FAFB' : '#1F2937',
      textMuted: isDark ? '#9CA3AF' : '#6B7280',
      border: isDark ? '#4B5563' : '#E5E7EB',
      accent: '#16A34A',
      accentLight: isDark ? 'rgba(22,163,74,0.2)' : '#DCFCE7',
      link: '#16A34A',
    };
  }

  function ratingBar(label, val, s) {
    var pct = Math.round((val / 5) * 100);
    return '<div class="oo-detail-row">' +
      '<span class="oo-detail-label">' + label + '</span>' +
      '<div class="oo-detail-bar">' +
        '<div class="oo-detail-track"><div class="oo-detail-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="oo-detail-val">' + val.toFixed(1) + '</span>' +
      '</div>' +
    '</div>';
  }

  function serviceLabel(type) {
    var labels = {
      privatumzug: 'Privatumzug',
      geschaeftsumzug: 'Geschäftsumzug',
      reinigung: 'Reinigung',
      endreinigung: 'Endreinigung',
      malerarbeiten: 'Malerarbeiten',
    };
    return labels[type] || type;
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function buildReviewCardHtml(r, s, t) {
    var detailBars = '';
    if (r.rating_price != null) detailBars += ratingBar(t.price, r.rating_price, s);
    if (r.rating_workflow != null) detailBars += ratingBar(t.workflow, r.rating_workflow, s);
    if (r.rating_administration != null) detailBars += ratingBar(t.admin, r.rating_administration, s);

    return '<div class="oo-review">' +
      '<div class="oo-review-header">' +
        '<div class="oo-review-author">' +
          '<svg class="oo-review-avatar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>' +
          '<div>' +
            '<div class="oo-review-name">' + escapeHtml(r.customer_name || 'Anonym') +
              (r.city ? '<span class="oo-review-city">, ' + escapeHtml(r.city) + '</span>' : '') +
            '</div>' +
            '<div class="oo-review-date">' + formatDate(r.review_date) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="oo-review-rating">' +
          renderStars(r.rating, 14) +
          '<span class="oo-review-rating-num">' + (r.rating || 0).toFixed(1) + '</span>' +
        '</div>' +
      '</div>' +
      (r.review_text ? '<p class="oo-review-text">' + escapeHtml(r.review_text) + '</p>' : '') +
      (detailBars ? '<div class="oo-review-details">' + detailBars + '</div>' : '') +
      (r.service_type ? '<span class="oo-review-service">' + escapeHtml(serviceLabel(r.service_type)) + '</span>' : '') +
    '</div>';
  }

  var REVIEW_CARD_CSS =
    '.oo-review { border-radius: 12px; padding: 16px; margin-bottom: 12px; }' +
    '.oo-review:last-child { margin-bottom: 0; }' +
    '.oo-review-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; gap: 8px; flex-wrap: wrap; }' +
    '.oo-review-author { display: flex; align-items: center; gap: 10px; min-width: 0; }' +
    '.oo-review-avatar { width: 32px; height: 32px; flex-shrink: 0; border-radius: 50%; padding: 4px; }' +
    '.oo-review-name { font-size: 13px; font-weight: 600; }' +
    '.oo-review-date { font-size: 11px; }' +
    '.oo-review-rating { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }' +
    '.oo-review-rating-num { font-size: 13px; font-weight: 700; }' +
    '.oo-review-text { font-size: 13px; line-height: 1.6; margin-bottom: 10px; }' +
    '.oo-review-details { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; padding-top: 8px; }' +
    '.oo-detail-row { display: flex; align-items: center; justify-content: space-between; font-size: 11px; }' +
    '.oo-detail-bar { display: flex; align-items: center; gap: 6px; }' +
    '.oo-detail-track { width: 60px; height: 4px; border-radius: 2px; overflow: hidden; }' +
    '.oo-detail-fill { height: 100%; background: #FBBF24; border-radius: 2px; }' +
    '.oo-detail-val { font-weight: 600; width: 24px; text-align: right; }' +
    '.oo-review-service { display: inline-block; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 20px; }';

  function reviewCardThemedCSS(s) {
    return '.oo-review { background: ' + s.bgCard + '; border: 1px solid ' + s.border + '; }' +
      '.oo-review-avatar { color: ' + s.textMuted + '; background: ' + s.border + '; }' +
      '.oo-review-name { color: ' + s.text + '; }' +
      '.oo-review-city { font-weight: 400; color: ' + s.textMuted + '; }' +
      '.oo-review-date { color: ' + s.textMuted + '; }' +
      '.oo-review-rating-num { color: ' + s.text + '; }' +
      '.oo-review-text { color: ' + s.text + '; }' +
      '.oo-review-details { border-top: 1px solid ' + s.border + '; }' +
      '.oo-detail-label { color: ' + s.textMuted + '; }' +
      '.oo-detail-track { background: ' + s.border + '; }' +
      '.oo-detail-val { color: ' + s.text + '; }' +
      '.oo-review-service { background: ' + s.accentLight + '; color: ' + s.accent + '; }';
  }

  var FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  var BASE_CSS = '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } a { text-decoration: none; color: inherit; }';

  /* ─── Router ─── */

  function renderWidget(container, data, type, theme, lang, position, autoplay) {
    var s = getStyles(theme);
    var t = getTexts(lang);
    var partner = data.partner;
    var reviews = data.reviews || [];
    var profileUrl = BASE_URL + '/partner/' + partner.slug;
    var rating = partner.average_rating || 0;
    var count = partner.review_count || 0;

    if (type === 'floating') {
      renderFloating(container, s, t, partner, reviews, profileUrl, rating, count, position);
    } else if (type === 'carousel') {
      renderCarousel(container, s, t, partner, reviews, profileUrl, rating, count, autoplay);
    } else if (type === 'badge') {
      var shadow = container.attachShadow({ mode: 'closed' });
      renderBadge(shadow, s, t, partner, profileUrl, rating, count);
    } else {
      var shadow2 = container.attachShadow({ mode: 'closed' });
      renderList(shadow2, s, t, partner, reviews, profileUrl, rating, count);
    }
  }

  /* ─── TYPE: badge ─── */

  function renderBadge(shadow, s, t, partner, profileUrl, rating, count) {
    shadow.innerHTML =
      '<style>' + BASE_CSS +
      '.oo-badge { font-family: ' + FONT + '; background: ' + s.bg + '; border: 1px solid ' + s.border + '; border-radius: 12px; padding: 16px; width: 260px; text-decoration: none; display: block; transition: box-shadow 0.2s; }' +
      '.oo-badge:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }' +
      '.oo-badge-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }' +
      '.oo-badge-logo { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; background: ' + s.bgCard + '; flex-shrink: 0; }' +
      '.oo-badge-name { font-size: 14px; font-weight: 600; color: ' + s.text + '; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
      '.oo-badge-stars { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }' +
      '.oo-badge-rating { font-size: 22px; font-weight: 700; color: ' + s.text + '; }' +
      '.oo-badge-count { font-size: 12px; color: ' + s.textMuted + '; }' +
      '.oo-badge-footer { display: flex; align-items: center; gap: 6px; padding-top: 10px; border-top: 1px solid ' + s.border + '; }' +
      '.oo-badge-check { width: 16px; height: 16px; color: ' + s.accent + '; flex-shrink: 0; }' +
      '.oo-badge-verified { font-size: 11px; color: ' + s.textMuted + '; }' +
      '.oo-badge-verified strong { color: ' + s.accent + '; font-weight: 600; }' +
      '</style>' +
      '<a class="oo-badge" href="' + profileUrl + '" target="_blank" rel="noopener">' +
        '<div class="oo-badge-header">' +
          (partner.logo_url ? '<img class="oo-badge-logo" src="' + partner.logo_url + '" alt="" />' : '<div class="oo-badge-logo"></div>') +
          '<div class="oo-badge-name">' + escapeHtml(partner.company_name) + '</div>' +
        '</div>' +
        '<div class="oo-badge-stars"><span class="oo-badge-rating">' + rating.toFixed(1) + '</span><span>' + renderStars(rating, 18) + '</span></div>' +
        '<div class="oo-badge-count">' + count + ' ' + t.reviews + '</div>' +
        '<div class="oo-badge-footer">' +
          '<svg class="oo-badge-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
          '<span class="oo-badge-verified">' + t.verifiedBy + ' <strong>Online-Offerten.ch</strong></span>' +
        '</div>' +
      '</a>';
  }

  /* ─── TYPE: list ─── */

  function renderList(shadow, s, t, partner, reviews, profileUrl, rating, count) {
    var reviewsHtml = '';
    if (reviews.length === 0) {
      reviewsHtml = '<div class="oo-empty">' + t.noReviews + '</div>';
    } else {
      reviews.forEach(function (r) { reviewsHtml += buildReviewCardHtml(r, s, t); });
    }

    shadow.innerHTML =
      '<style>' + BASE_CSS + ':host { display: block; }' +
      '.oo-widget { font-family: ' + FONT + '; background: ' + s.bg + '; border: 1px solid ' + s.border + '; border-radius: 16px; overflow: hidden; max-width: 520px; }' +
      '.oo-header { display: flex; align-items: center; justify-content: space-between; padding: 20px; border-bottom: 1px solid ' + s.border + '; }' +
      '.oo-header-left { display: flex; align-items: center; gap: 12px; min-width: 0; }' +
      '.oo-logo { width: 44px; height: 44px; border-radius: 10px; object-fit: cover; background: ' + s.bgCard + '; flex-shrink: 0; }' +
      '.oo-company { font-size: 15px; font-weight: 700; color: ' + s.text + '; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
      '.oo-summary { font-size: 12px; color: ' + s.textMuted + '; margin-top: 2px; }' +
      '.oo-header-right { text-align: right; flex-shrink: 0; padding-left: 12px; }' +
      '.oo-big-rating { font-size: 28px; font-weight: 800; color: ' + s.text + '; line-height: 1; }' +
      '.oo-out-of { font-size: 11px; color: ' + s.textMuted + '; }' +
      '.oo-reviews-list { padding: 12px 20px 16px; }' +
      REVIEW_CARD_CSS + reviewCardThemedCSS(s) +
      '.oo-empty { padding: 24px; text-align: center; font-size: 13px; color: ' + s.textMuted + '; }' +
      '.oo-footer { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-top: 1px solid ' + s.border + '; background: ' + s.bgCard + '; gap: 8px; flex-wrap: wrap; }' +
      '.oo-footer-brand { display: flex; align-items: center; gap: 6px; text-decoration: none; }' +
      '.oo-footer-check { width: 16px; height: 16px; color: ' + s.accent + '; flex-shrink: 0; }' +
      '.oo-footer-text { font-size: 11px; color: ' + s.textMuted + '; }' +
      '.oo-footer-text strong { color: ' + s.accent + '; font-weight: 600; }' +
      '.oo-footer-link { font-size: 12px; font-weight: 600; color: ' + s.link + '; text-decoration: none; white-space: nowrap; }' +
      '.oo-footer-link:hover { text-decoration: underline; }' +
      '</style>' +
      '<div class="oo-widget">' +
        '<a href="' + profileUrl + '" target="_blank" rel="noopener" class="oo-header">' +
          '<div class="oo-header-left">' +
            (partner.logo_url ? '<img class="oo-logo" src="' + partner.logo_url + '" alt="" />' : '<div class="oo-logo"></div>') +
            '<div><div class="oo-company">' + escapeHtml(partner.company_name) + '</div><div class="oo-summary">' + count + ' ' + t.reviews + '</div></div>' +
          '</div>' +
          '<div class="oo-header-right"><div class="oo-big-rating">' + rating.toFixed(1) + '</div><div>' + renderStars(rating, 14) + '</div><div class="oo-out-of">' + t.outOf + '</div></div>' +
        '</a>' +
        '<div class="oo-reviews-list">' + reviewsHtml + '</div>' +
        '<div class="oo-footer">' +
          '<a class="oo-footer-brand" href="' + BASE_URL + '" target="_blank" rel="noopener"><svg class="oo-footer-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span class="oo-footer-text">' + t.verifiedBy + ' <strong>Online-Offerten.ch</strong></span></a>' +
          '<a class="oo-footer-link" href="' + profileUrl + '" target="_blank" rel="noopener">' + t.allReviews + ' →</a>' +
        '</div>' +
      '</div>';
  }

  /* ─── TYPE: floating ─── */

  function renderFloating(container, s, t, partner, reviews, profileUrl, rating, count, position) {
    var isRight = position !== 'left';
    var wrapper = document.createElement('div');
    wrapper.id = 'oo-floating-root';
    wrapper.style.cssText = 'position:fixed;bottom:0;right:0;width:0;height:0;overflow:visible;pointer-events:none;z-index:999999;';
    document.body.appendChild(wrapper);
    var shadow = wrapper.attachShadow({ mode: 'closed' });

    var reviewsHtml = '';
    if (reviews.length === 0) {
      reviewsHtml = '<div class="oo-fl-empty">' + t.noReviews + '</div>';
    } else {
      reviews.forEach(function (r) { reviewsHtml += buildReviewCardHtml(r, s, t); });
    }

    var posCSS = isRight ? 'right: 20px;' : 'left: 20px;';
    var flyoutAlign = isRight ? 'right: 0;' : 'left: 0;';

    shadow.innerHTML =
      '<style>' + BASE_CSS +
      '@keyframes oo-pop-in { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }' +
      '@keyframes oo-slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }' +

      '.oo-fl-anchor { position: fixed; bottom: 20px; ' + posCSS + ' z-index: 999999; font-family: ' + FONT + '; animation: oo-pop-in 0.3s ease-out; pointer-events: auto; }' +

      '.oo-fl-btn { width: 62px; height: 62px; border-radius: 50%; background: ' + s.accent + '; border: 3px solid #fff; ' +
        'box-shadow: 0 4px 20px rgba(0,0,0,0.25); cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; ' +
        'transition: transform 0.2s, box-shadow 0.2s; position: relative; }' +
      '.oo-fl-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(0,0,0,0.3); }' +
      '.oo-fl-btn-star { width: 18px; height: 18px; color: #fff; }' +
      '.oo-fl-btn-num { font-size: 13px; font-weight: 800; color: #fff; line-height: 1; margin-top: 1px; }' +
      '.oo-fl-btn-pulse { position: absolute; inset: -4px; border-radius: 50%; border: 2px solid ' + s.accent + '; opacity: 0; animation: oo-pulse 2s ease-out infinite; }' +
      '@keyframes oo-pulse { 0% { opacity: 0.6; transform: scale(1); } 100% { opacity: 0; transform: scale(1.4); } }' +

      '.oo-fl-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 999998; pointer-events: auto; }' +
      '.oo-fl-overlay.oo-open { display: block; }' +

      '.oo-fl-flyout { display: none; position: absolute; bottom: 74px; ' + flyoutAlign + ' width: 380px; max-height: 520px; ' +
        'background: ' + s.bg + '; border: 1px solid ' + s.border + '; border-radius: 16px; overflow: hidden; ' +
        'box-shadow: 0 12px 48px rgba(0,0,0,0.2); }' +
      '.oo-fl-flyout.oo-open { display: flex; flex-direction: column; animation: oo-slide-up 0.25s ease-out; }' +

      '.oo-fl-header { padding: 16px 50px 16px 18px; border-bottom: 1px solid ' + s.border + '; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; position: relative; }' +
      '.oo-fl-header-left { display: flex; align-items: center; gap: 10px; min-width: 0; }' +
      '.oo-fl-logo { width: 38px; height: 38px; border-radius: 8px; object-fit: cover; background: ' + s.bgCard + '; flex-shrink: 0; }' +
      '.oo-fl-company { font-size: 14px; font-weight: 700; color: ' + s.text + '; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
      '.oo-fl-summary { font-size: 11px; color: ' + s.textMuted + '; margin-top: 2px; }' +
      '.oo-fl-header-right { text-align: right; flex-shrink: 0; padding-left: 8px; }' +
      '.oo-fl-big-num { font-size: 24px; font-weight: 800; color: ' + s.text + '; line-height: 1; }' +
      '.oo-fl-out-of { font-size: 10px; color: ' + s.textMuted + '; }' +

      '.oo-fl-close { position: absolute; top: 12px; right: 12px; width: 30px; height: 30px; border-radius: 50%; border: 1px solid ' + s.border + '; ' +
        'background: ' + s.bg + '; color: ' + s.textMuted + '; cursor: pointer; display: flex; align-items: center; justify-content: center; ' +
        'transition: all 0.15s ease; z-index: 10; padding: 0; }' +
      '.oo-fl-close:hover { background: ' + s.bgCard + '; color: ' + s.text + '; border-color: ' + s.textMuted + '; }' +
      '.oo-fl-close svg { width: 14px; height: 14px; }' +

      '.oo-fl-reviews { flex: 1; overflow-y: auto; padding: 12px 16px; }' +
      REVIEW_CARD_CSS + reviewCardThemedCSS(s) +
      '.oo-fl-empty { padding: 24px; text-align: center; font-size: 13px; color: ' + s.textMuted + '; }' +

      '.oo-fl-footer { padding: 12px 16px; border-top: 1px solid ' + s.border + '; background: ' + s.bgCard + '; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; gap: 6px; flex-wrap: wrap; }' +
      '.oo-fl-footer-brand { display: flex; align-items: center; gap: 5px; }' +
      '.oo-fl-footer-check { width: 14px; height: 14px; color: ' + s.accent + '; flex-shrink: 0; }' +
      '.oo-fl-footer-text { font-size: 10px; color: ' + s.textMuted + '; }' +
      '.oo-fl-footer-text strong { color: ' + s.accent + '; font-weight: 600; }' +
      '.oo-fl-footer-link { font-size: 11px; font-weight: 600; color: ' + s.link + '; text-decoration: none; }' +
      '.oo-fl-footer-link:hover { text-decoration: underline; }' +

      '@media (max-width: 480px) {' +
        '.oo-fl-flyout { width: calc(100vw - 32px); ' + flyoutAlign + ' bottom: 74px; max-height: 70vh; }' +
        '.oo-fl-anchor.oo-hidden { transform: translateY(100px); opacity: 0; transition: transform 0.3s, opacity 0.3s; }' +
        '.oo-fl-anchor { transition: transform 0.3s, opacity 0.3s; }' +
      '}' +
      '</style>' +

      '<div class="oo-fl-overlay" id="oo-fl-overlay"></div>' +
      '<div class="oo-fl-anchor" id="oo-fl-anchor">' +
        '<div class="oo-fl-btn" id="oo-fl-btn">' +
          '<div class="oo-fl-btn-pulse"></div>' +
          '<svg class="oo-fl-btn-star" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
          '<span class="oo-fl-btn-num">' + rating.toFixed(1) + '</span>' +
        '</div>' +
        '<div class="oo-fl-flyout" id="oo-fl-flyout">' +
          '<button class="oo-fl-close" id="oo-fl-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
          '<a href="' + profileUrl + '" target="_blank" rel="noopener" class="oo-fl-header">' +
            '<div class="oo-fl-header-left">' +
              (partner.logo_url ? '<img class="oo-fl-logo" src="' + partner.logo_url + '" alt="" />' : '<div class="oo-fl-logo"></div>') +
              '<div><div class="oo-fl-company">' + escapeHtml(partner.company_name) + '</div><div class="oo-fl-summary">' + renderStars(rating, 13) + ' ' + count + ' ' + t.reviews + '</div></div>' +
            '</div>' +
            '<div class="oo-fl-header-right"><div class="oo-fl-big-num">' + rating.toFixed(1) + '</div><div class="oo-fl-out-of">' + t.outOf + '</div></div>' +
          '</a>' +
          '<div class="oo-fl-reviews">' + reviewsHtml + '</div>' +
          '<div class="oo-fl-footer">' +
            '<a class="oo-fl-footer-brand" href="' + BASE_URL + '" target="_blank" rel="noopener"><svg class="oo-fl-footer-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span class="oo-fl-footer-text">' + t.verifiedBy + ' <strong>Online-Offerten.ch</strong></span></a>' +
            '<a class="oo-fl-footer-link" href="' + profileUrl + '" target="_blank" rel="noopener">' + t.allReviews + ' →</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    var btn = shadow.getElementById('oo-fl-btn');
    var flyout = shadow.getElementById('oo-fl-flyout');
    var overlay = shadow.getElementById('oo-fl-overlay');
    var closeBtn = shadow.getElementById('oo-fl-close');
    var anchor = shadow.getElementById('oo-fl-anchor');
    var isOpen = false;

    function toggleFlyout() {
      isOpen = !isOpen;
      flyout.classList.toggle('oo-open', isOpen);
      overlay.classList.toggle('oo-open', isOpen);
    }

    function closeFlyout() {
      isOpen = false;
      flyout.classList.remove('oo-open');
      overlay.classList.remove('oo-open');
    }

    btn.addEventListener('click', function (e) { e.stopPropagation(); toggleFlyout(); });
    closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closeFlyout(); });
    overlay.addEventListener('click', closeFlyout);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeFlyout(); });

    var lastScrollY = window.scrollY;
    var scrollTimer;
    window.addEventListener('scroll', function () {
      if (isOpen) return;
      clearTimeout(scrollTimer);
      var currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 200) {
        anchor.classList.add('oo-hidden');
      } else {
        anchor.classList.remove('oo-hidden');
      }
      lastScrollY = currentY;
      scrollTimer = setTimeout(function () { anchor.classList.remove('oo-hidden'); }, 1500);
    }, { passive: true });
  }

  /* ─── TYPE: carousel ─── */

  function renderCarousel(container, s, t, partner, reviews, profileUrl, rating, count, autoplay) {
    var shadow = container.attachShadow({ mode: 'closed' });

    if (reviews.length === 0) {
      shadow.innerHTML = '<style>' + BASE_CSS + '</style><div style="font-family:' + FONT + ';padding:24px;text-align:center;font-size:13px;color:' + s.textMuted + ';">' + t.noReviews + '</div>';
      return;
    }

    var slidesHtml = '';
    reviews.forEach(function (r) {
      slidesHtml +=
        '<div class="oo-car-slide">' +
          '<div class="oo-car-card">' +
            '<div class="oo-car-card-top">' +
              '<div class="oo-car-stars">' + renderStars(r.rating, 15) + '<span class="oo-car-rating-num">' + (r.rating || 0).toFixed(1) + '</span></div>' +
            '</div>' +
            (r.review_text ? '<p class="oo-car-text">' + escapeHtml(r.review_text) + '</p>' : '<p class="oo-car-text oo-car-text-empty">' + escapeHtml(serviceLabel(r.service_type || '')) + '</p>') +
            '<div class="oo-car-author">' +
              '<svg class="oo-car-avatar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>' +
              '<div>' +
                '<div class="oo-car-name">' + escapeHtml(r.customer_name || 'Anonym') + '</div>' +
                '<div class="oo-car-meta">' + (r.city ? escapeHtml(r.city) + ' · ' : '') + formatDate(r.review_date) + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    });

    var dotsHtml = '';
    if (reviews.length > 1) {
      dotsHtml = '<div class="oo-car-dots" id="oo-car-dots">';
      for (var i = 0; i < reviews.length; i++) {
        dotsHtml += '<span class="oo-car-dot' + (i === 0 ? ' oo-active' : '') + '" data-idx="' + i + '"></span>';
      }
      dotsHtml += '</div>';
    }

    shadow.innerHTML =
      '<style>' + BASE_CSS + ':host { display: block; }' +
      '.oo-car { font-family: ' + FONT + '; background: ' + s.bg + '; border: 1px solid ' + s.border + '; border-radius: 16px; overflow: hidden; max-width: 800px; }' +

      '.oo-car-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid ' + s.border + '; }' +
      '.oo-car-header-left { display: flex; align-items: center; gap: 10px; min-width: 0; }' +
      '.oo-car-logo { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; background: ' + s.bgCard + '; flex-shrink: 0; }' +
      '.oo-car-company { font-size: 14px; font-weight: 700; color: ' + s.text + '; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
      '.oo-car-header-summary { font-size: 11px; color: ' + s.textMuted + '; margin-top: 2px; }' +
      '.oo-car-header-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }' +
      '.oo-car-big-num { font-size: 22px; font-weight: 800; color: ' + s.text + '; }' +

      '.oo-car-body { position: relative; padding: 0; }' +
      '.oo-car-track-wrap { overflow: hidden; }' +
      '.oo-car-track { display: flex; transition: transform 0.35s ease; }' +
      '.oo-car-slide { flex: 0 0 100%; padding: 16px 20px; }' +
      '@media (min-width: 640px) { .oo-car-slide { flex: 0 0 50%; } }' +

      '.oo-car-card { background: ' + s.bgCard + '; border: 1px solid ' + s.border + '; border-radius: 12px; padding: 16px; height: 100%; display: flex; flex-direction: column; }' +
      '.oo-car-card-top { margin-bottom: 10px; }' +
      '.oo-car-stars { display: flex; align-items: center; gap: 4px; }' +
      '.oo-car-rating-num { font-size: 13px; font-weight: 700; color: ' + s.text + '; margin-left: 4px; }' +
      '.oo-car-text { font-size: 13px; color: ' + s.text + '; line-height: 1.6; flex: 1; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }' +
      '.oo-car-text-empty { color: ' + s.textMuted + '; font-style: italic; }' +
      '.oo-car-author { display: flex; align-items: center; gap: 8px; }' +
      '.oo-car-avatar { width: 28px; height: 28px; color: ' + s.textMuted + '; background: ' + s.border + '; border-radius: 50%; padding: 3px; flex-shrink: 0; }' +
      '.oo-car-name { font-size: 12px; font-weight: 600; color: ' + s.text + '; }' +
      '.oo-car-meta { font-size: 10px; color: ' + s.textMuted + '; }' +

      '.oo-car-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; border-radius: 50%; border: 1px solid ' + s.border + '; ' +
        'background: ' + s.bg + '; color: ' + s.text + '; cursor: pointer; display: flex; align-items: center; justify-content: center; ' +
        'box-shadow: 0 2px 8px rgba(0,0,0,0.1); z-index: 2; transition: background 0.2s; }' +
      '.oo-car-nav:hover { background: ' + s.bgCard + '; }' +
      '.oo-car-prev { left: 6px; }' +
      '.oo-car-next { right: 6px; }' +

      '.oo-car-dots { display: flex; justify-content: center; gap: 6px; padding: 12px 0; }' +
      '.oo-car-dot { width: 8px; height: 8px; border-radius: 50%; background: ' + s.border + '; cursor: pointer; transition: background 0.2s, transform 0.2s; }' +
      '.oo-car-dot.oo-active { background: ' + s.accent + '; transform: scale(1.25); }' +

      '.oo-car-footer { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-top: 1px solid ' + s.border + '; background: ' + s.bgCard + '; gap: 6px; flex-wrap: wrap; }' +
      '.oo-car-footer-brand { display: flex; align-items: center; gap: 5px; }' +
      '.oo-car-footer-check { width: 14px; height: 14px; color: ' + s.accent + '; flex-shrink: 0; }' +
      '.oo-car-footer-text { font-size: 10px; color: ' + s.textMuted + '; }' +
      '.oo-car-footer-text strong { color: ' + s.accent + '; font-weight: 600; }' +
      '.oo-car-footer-link { font-size: 11px; font-weight: 600; color: ' + s.link + '; text-decoration: none; }' +
      '.oo-car-footer-link:hover { text-decoration: underline; }' +
      '</style>' +

      '<div class="oo-car">' +
        '<a href="' + profileUrl + '" target="_blank" rel="noopener" class="oo-car-header">' +
          '<div class="oo-car-header-left">' +
            (partner.logo_url ? '<img class="oo-car-logo" src="' + partner.logo_url + '" alt="" />' : '<div class="oo-car-logo"></div>') +
            '<div><div class="oo-car-company">' + escapeHtml(partner.company_name) + '</div><div class="oo-car-header-summary">' + renderStars(rating, 12) + ' ' + count + ' ' + t.reviews + '</div></div>' +
          '</div>' +
          '<div class="oo-car-header-right"><span class="oo-car-big-num">' + rating.toFixed(1) + '</span><span>' + renderStars(rating, 16) + '</span></div>' +
        '</a>' +
        '<div class="oo-car-body">' +
          '<div class="oo-car-track-wrap"><div class="oo-car-track" id="oo-car-track">' + slidesHtml + '</div></div>' +
          (reviews.length > 1 ? '<button class="oo-car-nav oo-car-prev" id="oo-car-prev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>' : '') +
          (reviews.length > 1 ? '<button class="oo-car-nav oo-car-next" id="oo-car-next"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>' : '') +
        '</div>' +
        dotsHtml +
        '<div class="oo-car-footer">' +
          '<a class="oo-car-footer-brand" href="' + BASE_URL + '" target="_blank" rel="noopener"><svg class="oo-car-footer-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span class="oo-car-footer-text">' + t.verifiedBy + ' <strong>Online-Offerten.ch</strong></span></a>' +
          '<a class="oo-car-footer-link" href="' + profileUrl + '" target="_blank" rel="noopener">' + t.allReviews + ' →</a>' +
        '</div>' +
      '</div>';

    // Carousel JS logic
    if (reviews.length <= 1) return;

    var track = shadow.getElementById('oo-car-track');
    var prevBtn = shadow.getElementById('oo-car-prev');
    var nextBtn = shadow.getElementById('oo-car-next');
    var dotsEl = shadow.getElementById('oo-car-dots');
    var dots = dotsEl ? dotsEl.querySelectorAll('.oo-car-dot') : [];
    var current = 0;
    var slideCount = reviews.length;

    function getSlidesPerView() {
      var w = container.offsetWidth || track.parentElement.offsetWidth || 400;
      return w >= 640 ? 2 : 1;
    }

    function getMaxIndex() {
      return Math.max(0, slideCount - getSlidesPerView());
    }

    function goTo(idx) {
      var max = getMaxIndex();
      if (idx < 0) idx = max;
      if (idx > max) idx = 0;
      current = idx;
      var pct = (100 / slideCount) * current;
      track.style.transform = 'translateX(-' + pct + '%)';
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('oo-active', i === current);
      }
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); resetAutoplay(); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); resetAutoplay(); });

    if (dotsEl) {
      dotsEl.addEventListener('click', function (e) {
        var idx = e.target.getAttribute('data-idx');
        if (idx !== null) { goTo(parseInt(idx, 10)); resetAutoplay(); }
      });
    }

    // Touch / swipe
    var startX = 0;
    var isDragging = false;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      isDragging = false;
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goTo(current + 1); else goTo(current - 1);
        resetAutoplay();
      }
    }, { passive: true });

    // Autoplay
    var autoInterval = null;
    function startAutoplay() {
      if (!autoplay) return;
      autoInterval = setInterval(function () { goTo(current + 1); }, 5000);
    }
    function resetAutoplay() {
      clearInterval(autoInterval);
      startAutoplay();
    }
    startAutoplay();
  }

})();
