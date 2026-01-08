'use client'

import React from 'react';

const TiptapRenderer = ({ jsonContent }) => {
  // Eğer içerik string ise (HTML), direkt kullan
  if (typeof jsonContent === 'string') {
    return (
      <div
        className="prose prose-lg dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg xl:prose-xl [&_p]:whitespace-pre-wrap [&_p]:break-words [&_p]:mb-4 [&_p:empty]:mb-3 [&_p:empty]:min-h-[1.5rem] [&_p:empty]:block [&_h1]:!text-4xl [&_h1]:!font-bold [&_h1]:!mt-8 [&_h1]:!mb-4 [&_h2]:!text-3xl [&_h2]:!font-bold [&_h2]:!mt-6 [&_h2]:!mb-4 [&_h3]:!text-2xl [&_h3]:!font-semibold [&_h3]:!mt-5 [&_h3]:!mb-3 [&_h4]:!text-xl [&_h4]:!font-semibold [&_h4]:!mt-4 [&_h4]:!mb-2 [&_h5]:!text-lg [&_h5]:!font-semibold [&_h5]:!mt-3 [&_h5]:!mb-2 [&_h6]:!text-base [&_h6]:!font-semibold [&_h6]:!mt-2 [&_h6]:!mb-2 [&_table]:w-full [&_table]:min-w-[600px] [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:my-4 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-left [&_th]:whitespace-nowrap [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2 [&_td]:whitespace-nowrap"
      >
        <div className="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
          <div dangerouslySetInnerHTML={{ __html: jsonContent }} />
        </div>
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
        className="prose prose-lg dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg xl:prose-xl [&_p]:whitespace-pre-wrap [&_p]:break-words [&_p]:mb-4 [&_p:empty]:mb-3 [&_p:empty]:min-h-[1.5rem] [&_p:empty]:block [&_h1]:!text-4xl [&_h1]:!font-bold [&_h1]:!mt-8 [&_h1]:!mb-4 [&_h2]:!text-3xl [&_h2]:!font-bold [&_h2]:!mt-6 [&_h2]:!mb-4 [&_h3]:!text-2xl [&_h3]:!font-semibold [&_h3]:!mt-5 [&_h3]:!mb-3 [&_h4]:!text-xl [&_h4]:!font-semibold [&_h4]:!mt-4 [&_h4]:!mb-2 [&_h5]:!text-lg [&_h5]:!font-semibold [&_h5]:!mt-3 [&_h5]:!mb-2 [&_h6]:!text-base [&_h6]:!font-semibold [&_h6]:!mt-2 [&_h6]:!mb-2 [&_table]:w-full [&_table]:min-w-[600px] [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300 [&_table]:my-4 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-left [&_th]:whitespace-nowrap [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2 [&_td]:whitespace-nowrap"
      >
        <div className="overflow-x-auto -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    );
  }

  return null;
};

export default TiptapRenderer;
