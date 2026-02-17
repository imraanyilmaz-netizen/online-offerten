'use client'

import React from 'react';

const TiptapRenderer = ({ jsonContent }) => {
  // Standard-Klassen zu HTML-Überschriften und Absatz-Tags hinzufügen
  const addStandardClasses = (html) => {
    if (!html) return html;
    
    let processed = html;
    
    // Her tag için: class yoksa ekle, varsa kontrol et ve ekle
    const addClassToTag = (tag, className) => {
      // Class olmayan tag'leri bul ve class ekle
      processed = processed.replace(
        new RegExp(`<${tag}(?![^>]*class=)([^>]*)>`, 'gi'),
        `<${tag} class="${className}"$1>`
      );
      
      // Class olan tag'leri bul ve class ekle (eğer yoksa)
      processed = processed.replace(
        new RegExp(`<${tag}([^>]*class=")([^"]*)"([^>]*)>`, 'gi'),
        (match, p1, p2, p3) => {
          if (!p2.includes(className)) {
            return `<${tag}${p1}${p2} ${className}"${p3}>`;
          }
          return match;
        }
      );
    };
    
    // Standart class'ları ekle
    addClassToTag('h1', 'heading-1');
    addClassToTag('h2', 'heading-2');
    addClassToTag('h3', 'heading-3');
    addClassToTag('h4', 'heading-4');
    addClassToTag('h5', 'heading-5');
    addClassToTag('h6', 'heading-6');
    addClassToTag('p', 'text-body');
    
    return processed;
  };

  // Bozuk heading class'larını temizle (TipTap'ın fonksiyon serialize hatası)
  // Örnek: class="e=>"heading-".concat(e) heading-2" → class="heading-2"
  const cleanBrokenHeadingClasses = (html) => {
    if (!html) return html;
    return html.replace(
      /class="([^"]*?)e=(?:&gt;|>)(?:&quot;|")heading-(?:&quot;|")\.concat\(e\)\s*/gi,
      'class="$1'
    );
  };

  // İç linklerden nofollow ve target="_blank" kaldır (dış linkler korunur)
  const fixInternalLinks = (html) => {
    if (!html) return html;
    
    return html.replace(/<a\s[^>]*>/gi, (match) => {
      // href değerini kontrol et
      const hrefMatch = match.match(/href="([^"]*)"/i);
      if (!hrefMatch) return match;
      
      const href = hrefMatch[1];
      // İç link mi kontrol et (relative veya online-offerten.ch domain)
      const isInternal = href.startsWith('/') || 
                          href.includes('online-offerten.ch');
      
      if (!isInternal) return match; // Dış linklere dokunma
      
      let fixed = match;
      // target="_blank" kaldır
      fixed = fixed.replace(/\s*target="_blank"/g, '');
      // rel'den nofollow kaldır, diğerlerini koru
      fixed = fixed.replace(/rel="([^"]*)"/g, (m, relValue) => {
        const parts = relValue.split(/\s+/).filter(p => p !== 'nofollow' && p !== '');
        return parts.length > 0 ? `rel="${parts.join(' ')}"` : '';
      });
      
      return fixed;
    });
  };

  // Eski URL'leri yeni URL'lere dönüştür (href attribute'larında)
  const fixOldUrls = (html) => {
    if (!html) return html;
    
    return html.replace(/href="([^"]*)"/gi, (match, url) => {
      let newUrl = url;
      // /umzugsfirma-in-der-naehe/X → /umzugsfirma/X (sadece alt sayfa varsa)
      newUrl = newUrl.replace(/\/umzugsfirma-in-der-naehe\//g, '/umzugsfirma/');
      // /reinigungsfirma-in-der-naehe → /reinigungsfirma
      newUrl = newUrl.replace(/\/reinigungsfirma-in-der-naehe/g, '/reinigungsfirma');
      // /malerfirma-in-der-naehe → /malerfirma
      newUrl = newUrl.replace(/\/malerfirma-in-der-naehe/g, '/malerfirma');
      return `href="${newUrl}"`;
    });
  };

  // HTML içindeki tabloları overflow-x-auto wrapper ile sarmala
  const wrapTablesInScrollableContainer = (html) => {
    if (!html || !html.includes('<table')) return html;
    
    // Basit ve güvenilir regex - her <table>...</table> bloğunu yakala
    // Nested tablolar için de çalışır (non-greedy match)
    return html.replace(
      /(<table[\s\S]*?<\/table>)/gi,
      '<div class="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 my-4">$1</div>'
    );
  };

  // Başlıklara otomatik id attribute ekle (anchor navigation + TOC için)
  // h2, h3 başlıklarına URL-uyumlu slug ID'si eklenir
  const addAnchorIds = (html) => {
    if (!html) return html;
    const usedIds = {};

    return html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (match, tag, attrs, content) => {
      // Zaten id varsa dokunma
      if (/\bid=/.test(attrs)) return match;

      // HTML tag'lerini ve entity'leri temizle → düz metin
      const plainText = content.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').trim();
      if (!plainText) return match;

      // Almanca karakterleri dönüştür ve URL-uyumlu slug oluştur
      let slug = plainText
        .toLowerCase()
        .replace(/[äÄ]/g, 'ae')
        .replace(/[öÖ]/g, 'oe')
        .replace(/[üÜ]/g, 'ue')
        .replace(/[ß]/g, 'ss')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      if (!slug) return match;

      // Aynı slug varsa sonuna numara ekle (tekil olsun)
      if (usedIds[slug]) {
        usedIds[slug]++;
        slug = `${slug}-${usedIds[slug]}`;
      } else {
        usedIds[slug] = 1;
      }

      return `<${tag}${attrs} id="${slug}">${content}</${tag}>`;
    });
  };

  // Tüm HTML dönüşümlerini sırayla uygula
  const processHtml = (html) => {
    let processed = html;
    processed = cleanBrokenHeadingClasses(processed);  // 1. Bozuk class'ları temizle
    processed = addAnchorIds(processed);                // 2. Başlıklara id ekle (class'lardan önce)
    processed = addStandardClasses(processed);          // 3. Standart class'ları ekle
    processed = fixInternalLinks(processed);            // 4. İç linklerden nofollow kaldır
    processed = fixOldUrls(processed);                  // 5. Eski URL'leri güncelle
    processed = wrapTablesInScrollableContainer(processed); // 6. Tabloları sarmala
    return processed;
  };

  // Wenn der Inhalt ein String (HTML) ist, direkt verwenden
  if (typeof jsonContent === 'string') {
    const processedContent = processHtml(jsonContent);
    return (
      <div
        className="[&_p]:whitespace-pre-wrap [&_p]:break-words [&_p:empty]:mb-3 [&_p:empty]:min-h-[1.5rem] [&_p:empty]:block [&_table]:w-full [&_table]:min-w-[600px] [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:my-0 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-left [&_th]:whitespace-nowrap [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2 [&_td]:whitespace-nowrap"
      >
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>
    );
  }

  // Eğer TipTap JSON formatı ise, HTML'e dönüştür (geriye dönük uyumluluk)
  if (jsonContent && typeof jsonContent === 'object') {
    // Text node'larındaki mark'ları (bold, italic, underline, link) HTML'e dönüştür
    const processMarks = (child) => {
      if (child.type !== 'text') return '';
      let formattedText = child.text;
      if (child.marks) {
        child.marks.forEach((mark) => {
          if (mark.type === 'bold') formattedText = `<strong>${formattedText}</strong>`;
          if (mark.type === 'italic') formattedText = `<em>${formattedText}</em>`;
          if (mark.type === 'underline') formattedText = `<u>${formattedText}</u>`;
          if (mark.type === 'link' && mark.attrs?.href) {
            formattedText = `<a href="${mark.attrs.href}" rel="noopener noreferrer" class="text-blue-600 underline cursor-pointer">${formattedText}</a>`;
          }
        });
      }
      return formattedText;
    };

    const convertTipTapToHTML = (json) => {
      if (!json || !json.content) return '';

      let html = '';
      json.content.forEach((node) => {
        if (node.type === 'paragraph') {
          let text = '';
          if (node.content) {
            node.content.forEach((child) => {
              if (child.type === 'text') {
                text += processMarks(child);
              } else if (child.type === 'hardBreak') {
                text += '<br>';
              }
            });
          }
          html += `<p class="text-body">${text}</p>`;
        } else if (node.type === 'heading') {
          const level = node.attrs?.level || 1;
          let text = '';
          if (node.content) {
            node.content.forEach((child) => {
              if (child.type === 'text') {
                text += processMarks(child);
              }
            });
          }
          const headingClass = `heading-${level}`;
          html += `<h${level} class="${headingClass}">${text}</h${level}>`;
        } else if (node.type === 'bulletList' || node.type === 'orderedList') {
          const tag = node.type === 'bulletList' ? 'ul' : 'ol';
          let items = '';
          if (node.content) {
            node.content.forEach((item) => {
              if (item.type === 'listItem' && item.content) {
                let itemText = '';
                item.content.forEach((para) => {
                  if (para.type === 'paragraph' && para.content) {
                    para.content.forEach((child) => {
                      if (child.type === 'text') itemText += processMarks(child);
                    });
                  }
                });
                items += `<li>${itemText}</li>`;
              }
            });
          }
          html += `<${tag}>${items}</${tag}>`;
        } else if (node.type === 'blockquote') {
          let text = '';
          if (node.content) {
            node.content.forEach((child) => {
              if (child.type === 'paragraph' && child.content) {
                child.content.forEach((textNode) => {
                  if (textNode.type === 'text') text += processMarks(textNode);
                });
              }
            });
          }
          html += `<blockquote>${text}</blockquote>`;
        } else if (node.type === 'codeBlock') {
          let code = '';
          if (node.content) {
            node.content.forEach((child) => {
              if (child.type === 'text') code += child.text;
            });
          }
          html += `<pre><code>${code}</code></pre>`;
        } else if (node.type === 'image') {
          const src = node.attrs?.src || '';
          const alt = node.attrs?.alt || '';
          html += `<img src="${src}" alt="${alt}" class="max-w-full h-auto rounded-lg" />`;
        } else if (node.type === 'horizontalRule') {
          html += '<hr>';
        }
      });
      return html;
    };

    const htmlContent = convertTipTapToHTML(jsonContent);
    const processedContent = processHtml(htmlContent);
    return (
      <div
        className="[&_p]:whitespace-pre-wrap [&_p]:break-words [&_p:empty]:mb-3 [&_p:empty]:min-h-[1.5rem] [&_p:empty]:block [&_table]:w-full [&_table]:min-w-[600px] [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:my-0 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-left [&_th]:whitespace-nowrap [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2 [&_td]:whitespace-nowrap"
      >
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>
    );
  }

  return null;
};

export default TiptapRenderer;
