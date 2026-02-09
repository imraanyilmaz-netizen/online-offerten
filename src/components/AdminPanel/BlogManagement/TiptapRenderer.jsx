'use client'

import React from 'react';

const TiptapRenderer = ({ jsonContent }) => {
  // HTML içindeki başlık ve paragraf tag'lerine standart class'ları ekle
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

  // Eğer içerik string ise (HTML), direkt kullan
  if (typeof jsonContent === 'string') {
    const withClasses = addStandardClasses(jsonContent);
    const wrappedContent = wrapTablesInScrollableContainer(withClasses);
    return (
      <div
        className="[&_p]:whitespace-pre-wrap [&_p]:break-words [&_p:empty]:mb-3 [&_p:empty]:min-h-[1.5rem] [&_p:empty]:block [&_table]:w-full [&_table]:min-w-[600px] [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:my-0 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-left [&_th]:whitespace-nowrap [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2 [&_td]:whitespace-nowrap"
      >
        <div dangerouslySetInnerHTML={{ __html: wrappedContent }} />
      </div>
    );
  }

  // Eğer TipTap JSON formatı ise, HTML'e dönüştür (geriye dönük uyumluluk)
  if (jsonContent && typeof jsonContent === 'object') {
    const convertTipTapToHTML = (json) => {
      if (!json || !json.content) return '';

      let html = '';
      json.content.forEach((node) => {
        if (node.type === 'paragraph') {
          let text = '';
          if (node.content) {
            node.content.forEach((child) => {
              if (child.type === 'text') {
                let formattedText = child.text;
                if (child.marks) {
                  child.marks.forEach((mark) => {
                    if (mark.type === 'bold') formattedText = `<strong>${formattedText}</strong>`;
                    if (mark.type === 'italic') formattedText = `<em>${formattedText}</em>`;
                    if (mark.type === 'underline') formattedText = `<u>${formattedText}</u>`;
                  });
                }
                text += formattedText;
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
                let formattedText = child.text;
                if (child.marks) {
                  child.marks.forEach((mark) => {
                    if (mark.type === 'bold') formattedText = `<strong>${formattedText}</strong>`;
                    if (mark.type === 'italic') formattedText = `<em>${formattedText}</em>`;
                  });
                }
                text += formattedText;
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
                      if (child.type === 'text') itemText += child.text;
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
                  if (textNode.type === 'text') text += textNode.text;
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
    const withClasses = addStandardClasses(htmlContent);
    const wrappedContent = wrapTablesInScrollableContainer(withClasses);
    return (
      <div
        className="[&_p]:whitespace-pre-wrap [&_p]:break-words [&_p:empty]:mb-3 [&_p:empty]:min-h-[1.5rem] [&_p:empty]:block [&_table]:w-full [&_table]:min-w-[600px] [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:my-0 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-left [&_th]:whitespace-nowrap [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2 [&_td]:whitespace-nowrap"
      >
        <div dangerouslySetInnerHTML={{ __html: wrappedContent }} />
      </div>
    );
  }

  return null;
};

export default TiptapRenderer;
