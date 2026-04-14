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

    if (container.id === 'online-offerten-badge') type = 'badge';

    var apiUrl =
      BASE_URL + API_PATH + encodeURIComponent(partnerId) +
      '?limit=' + limit + '&type=' + type;

    fetch(apiUrl)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data.partner) return;
        renderWidget(container, data, type, theme, lang);
      })
      .catch(function () {
        // Silently fail - don't break host site
      });
  });

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
      '<defs><linearGradient id="oo-half"><stop offset="50%" stop-color="#FBBF24"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs>' +
      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#oo-half)" stroke="#D1D5DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
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
        writeReview: 'Bewertung abgeben',
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
        writeReview: 'Donner un avis',
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
        writeReview: 'Scrivi una recensione',
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

  function renderWidget(container, data, type, theme, lang) {
    var shadow = container.attachShadow({ mode: 'closed' });
    var s = getStyles(theme);
    var t = getTexts(lang);
    var partner = data.partner;
    var reviews = data.reviews || [];
    var profileUrl = BASE_URL + '/partner/' + partner.slug;
    var rating = partner.average_rating || 0;
    var count = partner.review_count || 0;

    if (type === 'badge') {
      renderBadge(shadow, s, t, partner, profileUrl, rating, count);
    } else {
      renderList(shadow, s, t, partner, reviews, profileUrl, rating, count);
    }
  }

  function renderBadge(shadow, s, t, partner, profileUrl, rating, count) {
    shadow.innerHTML =
      '<style>' +
      '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }' +
      '.oo-badge { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; ' +
        'background: ' + s.bg + '; border: 1px solid ' + s.border + '; border-radius: 12px; ' +
        'padding: 16px; width: 260px; text-decoration: none; display: block; transition: box-shadow 0.2s; }' +
      '.oo-badge:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }' +
      '.oo-badge-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }' +
      '.oo-badge-logo { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; background: ' + s.bgCard + '; flex-shrink: 0; }' +
      '.oo-badge-name { font-size: 14px; font-weight: 600; color: ' + s.text + '; line-height: 1.3; ' +
        'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
      '.oo-badge-stars { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }' +
      '.oo-badge-rating { font-size: 22px; font-weight: 700; color: ' + s.text + '; }' +
      '.oo-badge-count { font-size: 12px; color: ' + s.textMuted + '; }' +
      '.oo-badge-footer { display: flex; align-items: center; gap: 6px; padding-top: 10px; ' +
        'border-top: 1px solid ' + s.border + '; }' +
      '.oo-badge-check { width: 16px; height: 16px; color: ' + s.accent + '; flex-shrink: 0; }' +
      '.oo-badge-verified { font-size: 11px; color: ' + s.textMuted + '; }' +
      '.oo-badge-verified strong { color: ' + s.accent + '; font-weight: 600; }' +
      '</style>' +
      '<a class="oo-badge" href="' + profileUrl + '" target="_blank" rel="noopener">' +
        '<div class="oo-badge-header">' +
          (partner.logo_url
            ? '<img class="oo-badge-logo" src="' + partner.logo_url + '" alt="" />'
            : '<div class="oo-badge-logo"></div>') +
          '<div class="oo-badge-name">' + escapeHtml(partner.company_name) + '</div>' +
        '</div>' +
        '<div class="oo-badge-stars">' +
          '<span class="oo-badge-rating">' + rating.toFixed(1) + '</span>' +
          '<span>' + renderStars(rating, 18) + '</span>' +
        '</div>' +
        '<div class="oo-badge-count">' + count + ' ' + t.reviews + '</div>' +
        '<div class="oo-badge-footer">' +
          '<svg class="oo-badge-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
          '<span class="oo-badge-verified">' + t.verifiedBy + ' <strong>Online-Offerten.ch</strong></span>' +
        '</div>' +
      '</a>';
  }

  function renderList(shadow, s, t, partner, reviews, profileUrl, rating, count) {
    var reviewsHtml = '';

    if (reviews.length === 0) {
      reviewsHtml = '<div class="oo-empty">' + t.noReviews + '</div>';
    } else {
      reviews.forEach(function (r) {
        var detailBars = '';
        if (r.rating_price != null) {
          detailBars += ratingBar(t.price, r.rating_price, s);
        }
        if (r.rating_workflow != null) {
          detailBars += ratingBar(t.workflow, r.rating_workflow, s);
        }
        if (r.rating_administration != null) {
          detailBars += ratingBar(t.admin, r.rating_administration, s);
        }

        reviewsHtml +=
          '<div class="oo-review">' +
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
      });
    }

    shadow.innerHTML =
      '<style>' +
      '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }' +
      ':host { display: block; }' +
      '.oo-widget { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; ' +
        'background: ' + s.bg + '; border: 1px solid ' + s.border + '; border-radius: 16px; ' +
        'overflow: hidden; max-width: 520px; }' +
      '.oo-header { display: flex; align-items: center; justify-content: space-between; padding: 20px; ' +
        'border-bottom: 1px solid ' + s.border + '; }' +
      '.oo-header-left { display: flex; align-items: center; gap: 12px; min-width: 0; }' +
      '.oo-logo { width: 44px; height: 44px; border-radius: 10px; object-fit: cover; background: ' + s.bgCard + '; flex-shrink: 0; }' +
      '.oo-company { font-size: 15px; font-weight: 700; color: ' + s.text + '; line-height: 1.3; ' +
        'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }' +
      '.oo-summary { font-size: 12px; color: ' + s.textMuted + '; margin-top: 2px; }' +
      '.oo-header-right { text-align: right; flex-shrink: 0; padding-left: 12px; }' +
      '.oo-big-rating { font-size: 28px; font-weight: 800; color: ' + s.text + '; line-height: 1; }' +
      '.oo-out-of { font-size: 11px; color: ' + s.textMuted + '; }' +
      '.oo-reviews-list { padding: 12px 20px 16px; }' +
      '.oo-review { background: ' + s.bgCard + '; border: 1px solid ' + s.border + '; border-radius: 12px; padding: 16px; margin-bottom: 12px; }' +
      '.oo-review:last-child { margin-bottom: 0; }' +
      '.oo-review-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; gap: 8px; flex-wrap: wrap; }' +
      '.oo-review-author { display: flex; align-items: center; gap: 10px; min-width: 0; }' +
      '.oo-review-avatar { width: 32px; height: 32px; color: ' + s.textMuted + '; flex-shrink: 0; background: ' + s.border + '; border-radius: 50%; padding: 4px; }' +
      '.oo-review-name { font-size: 13px; font-weight: 600; color: ' + s.text + '; }' +
      '.oo-review-city { font-weight: 400; color: ' + s.textMuted + '; }' +
      '.oo-review-date { font-size: 11px; color: ' + s.textMuted + '; }' +
      '.oo-review-rating { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }' +
      '.oo-review-rating-num { font-size: 13px; font-weight: 700; color: ' + s.text + '; }' +
      '.oo-review-text { font-size: 13px; color: ' + s.text + '; line-height: 1.6; margin-bottom: 10px; }' +
      '.oo-review-details { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; padding-top: 8px; border-top: 1px solid ' + s.border + '; }' +
      '.oo-detail-row { display: flex; align-items: center; justify-content: space-between; font-size: 11px; }' +
      '.oo-detail-label { color: ' + s.textMuted + '; }' +
      '.oo-detail-bar { display: flex; align-items: center; gap: 6px; }' +
      '.oo-detail-track { width: 60px; height: 4px; background: ' + s.border + '; border-radius: 2px; overflow: hidden; }' +
      '.oo-detail-fill { height: 100%; background: #FBBF24; border-radius: 2px; }' +
      '.oo-detail-val { font-weight: 600; color: ' + s.text + '; width: 24px; text-align: right; }' +
      '.oo-review-service { display: inline-block; font-size: 11px; font-weight: 500; ' +
        'background: ' + s.accentLight + '; color: ' + s.accent + '; padding: 3px 10px; border-radius: 20px; }' +
      '.oo-empty { padding: 24px; text-align: center; font-size: 13px; color: ' + s.textMuted + '; }' +
      '.oo-footer { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; ' +
        'border-top: 1px solid ' + s.border + '; background: ' + s.bgCard + '; gap: 8px; flex-wrap: wrap; }' +
      '.oo-footer-brand { display: flex; align-items: center; gap: 6px; text-decoration: none; }' +
      '.oo-footer-check { width: 16px; height: 16px; color: ' + s.accent + '; flex-shrink: 0; }' +
      '.oo-footer-text { font-size: 11px; color: ' + s.textMuted + '; }' +
      '.oo-footer-text strong { color: ' + s.accent + '; font-weight: 600; }' +
      '.oo-footer-link { font-size: 12px; font-weight: 600; color: ' + s.link + '; text-decoration: none; white-space: nowrap; }' +
      '.oo-footer-link:hover { text-decoration: underline; }' +
      'a { text-decoration: none; color: inherit; }' +
      '</style>' +
      '<div class="oo-widget">' +
        '<a href="' + profileUrl + '" target="_blank" rel="noopener" class="oo-header">' +
          '<div class="oo-header-left">' +
            (partner.logo_url
              ? '<img class="oo-logo" src="' + partner.logo_url + '" alt="" />'
              : '<div class="oo-logo"></div>') +
            '<div>' +
              '<div class="oo-company">' + escapeHtml(partner.company_name) + '</div>' +
              '<div class="oo-summary">' + count + ' ' + t.reviews + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="oo-header-right">' +
            '<div class="oo-big-rating">' + rating.toFixed(1) + '</div>' +
            '<div>' + renderStars(rating, 14) + '</div>' +
            '<div class="oo-out-of">' + t.outOf + '</div>' +
          '</div>' +
        '</a>' +
        '<div class="oo-reviews-list">' + reviewsHtml + '</div>' +
        '<div class="oo-footer">' +
          '<a class="oo-footer-brand" href="' + BASE_URL + '" target="_blank" rel="noopener">' +
            '<svg class="oo-footer-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
            '<span class="oo-footer-text">' + t.verifiedBy + ' <strong>Online-Offerten.ch</strong></span>' +
          '</a>' +
          '<a class="oo-footer-link" href="' + profileUrl + '" target="_blank" rel="noopener">' + t.allReviews + ' →</a>' +
        '</div>' +
      '</div>';
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
})();
