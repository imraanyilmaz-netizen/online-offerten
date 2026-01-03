'use client'

import React from 'react';

const TiptapRenderer = ({ jsonContent }) => {
  // Eğer içerik string ise (HTML), direkt kullan
  if (typeof jsonContent === 'string') {
    return (
      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg xl:prose-xl [&_p]:whitespace-pre-wrap [&_p]:break-words [&_p]:mb-6 [&_p:empty]:mb-6 [&_p:empty]:min-h-[1.5rem] [&_p:empty]:block [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:mt-6 [&_h3]:mb-3"
        dangerouslySetInnerHTML={{ __html: jsonContent }}
      />
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
          html += `<p>${text}</p>`;
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
          html += `<h${level}>${text}</h${level}>`;
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
    return (
      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg xl:prose-xl [&_p]:whitespace-pre-wrap [&_p]:break-words [&_p]:mb-6 [&_p:empty]:mb-6 [&_p:empty]:min-h-[1.5rem] [&_p:empty]:block [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:mt-6 [&_h3]:mb-3"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  return null;
};

export default TiptapRenderer;
