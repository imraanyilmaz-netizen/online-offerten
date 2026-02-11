'use client'

import React, { useCallback, useRef, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import { FontFamily } from '@tiptap/extension-font-family';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Mark } from '@tiptap/core';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { normalizeFileName } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Palette,
  Type,
  Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Font Size Extension - Basit Mark extension
const FontSize = Mark.create({
  name: 'fontSize',
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: element => {
          const fontSize = element.style.fontSize;
          return fontSize ? fontSize.replace('px', '') : null;
        },
        renderHTML: attributes => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}px`,
          };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span[style*="font-size"]',
        getAttrs: element => {
          const fontSize = element.style.fontSize;
          return fontSize ? { fontSize: fontSize.replace('px', '') } : null;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain().setMark('fontSize', { fontSize: fontSize.toString() }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().unsetMark('fontSize').run();
      },
    };
  },
});

const TiptapEditor = ({ content, onChange, insertHtml }) => {
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  // Editor'ı sadece client-side'da oluştur
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
          // Class'lar TiptapRenderer tarafından ekleniyor (heading-1, heading-2, vb.)
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'bg-gray-100 rounded p-2 font-mono text-sm',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-6 mb-4',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-6 mb-4',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'mb-2',
          },
        },
      }),
      Placeholder.configure({
        placeholder: 'Schreiben Sie hier Ihren Artikel...',
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
      FontSize,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'orderedList', 'tableCell'],
      }),
      Underline,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
          rel: 'noopener noreferrer',
          target: null,
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        HTMLAttributes: {
          class: 'border-collapse border border-gray-300 w-full my-4',
        },
        resizable: true,
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border border-gray-300',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 bg-gray-100 px-4 py-2 font-semibold text-left',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 px-4 py-2',
        },
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      // Her değişiklikte anında güncelle (dinamik preview)
      // Boş paragrafları koru - &nbsp; ekle
      let html = editor.getHTML();
      html = html.replace(/<p><\/p>/g, '<p>&nbsp;</p>').replace(/<p>\s*<\/p>/g, '<p>&nbsp;</p>');
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-6 [&_p]:whitespace-pre-wrap [&_p]:break-words [&_p]:mb-4 [&_p:empty]:mb-3 [&_p:empty]:min-h-[1.5rem] [&_p:empty]:block [&_h1]:!text-[28px] [&_h1]:sm:!text-[32px] [&_h1]:md:!text-[36px] [&_h1]:lg:!text-[40px] [&_h1]:!font-bold [&_h1]:!mt-8 [&_h1]:!mb-6 [&_h2]:!text-[22px] [&_h2]:md:!text-[30px] [&_h2]:!font-bold [&_h2]:!mt-6 [&_h2]:!mb-4 [&_h3]:!text-[20px] [&_h3]:md:!text-[24px] [&_h3]:!font-semibold [&_h3]:!mt-5 [&_h3]:!mb-3 [&_h4]:!text-[18px] [&_h4]:md:!text-[20px] [&_h4]:!font-semibold [&_h4]:!mt-4 [&_h4]:!mb-2 [&_h5]:!text-[16px] [&_h5]:md:!text-[18px] [&_h5]:!font-semibold [&_h5]:!mt-3 [&_h5]:!mb-2 [&_h6]:!text-[14px] [&_h6]:md:!text-[16px] [&_h6]:!font-semibold [&_h6]:!mt-2 [&_h6]:!mb-2 [&_p]:!text-[16px] [&_p]:md:!text-[18px] [&_ul]:!list-disc [&_ul]:!ml-6 [&_ul]:!mb-4 [&_ul]:!pl-6 [&_ol]:!list-decimal [&_ol]:!ml-6 [&_ol]:!mb-4 [&_ol]:!pl-6 [&_li]:!mb-2 [&_li]:!list-item [&_table]:!border-collapse [&_table]:!w-full [&_table]:!my-4 [&_table]:!border [&_table]:!border-gray-300 [&_th]:!border [&_th]:!border-gray-300 [&_th]:!bg-gray-100 [&_th]:!px-4 [&_th]:!py-2 [&_th]:!font-semibold [&_th]:!text-left [&_td]:!border [&_td]:!border-gray-300 [&_td]:!px-4 [&_td]:!py-2',
      },
      transformPastedHTML(html) {
        // Boş paragrafları koru - &nbsp; ekle
        return html.replace(/<p><\/p>/g, '<p>&nbsp;</p>').replace(/<p>\s*<\/p>/g, '<p>&nbsp;</p>');
      },
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!isMounted || !editor) return;
    if (content && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor, isMounted]);

  // Insert HTML from custom HTML field
  useEffect(() => {
    if (!isMounted || !editor || !insertHtml) return;
    // Use setTimeout to avoid state update during render
    const timeoutId = setTimeout(() => {
      if (editor && insertHtml) {
        editor.chain().focus().insertContent(insertHtml, { parseOptions: { preserveWhitespace: 'full' } }).run();
      }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [insertHtml, editor, isMounted]);

  const handleImageUpload = useCallback(async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const normalizedName = normalizeFileName(file.name);
      const fileName = `${uuidv4()}-${normalizedName}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from('posts-images')
          .upload(fileName, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('posts-images')
          .getPublicUrl(fileName);

        if (publicUrl && editor) {
          editor.chain().focus().setImage({ src: publicUrl }).run();
          toast({
            title: 'Erfolg',
            description: 'Bild erfolgreich hochgeladen und eingefügt.',
          });
        } else {
          throw new Error('Public URL konnte nicht abgerufen werden.');
        }
      } catch (error) {
        toast({
          title: 'Fehler',
          description: `Bild-Upload fehlgeschlagen: ${error.message}`,
          variant: 'destructive',
        });
      }
    };
  }, [editor, toast]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl || 'https://');

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const setFontSize = useCallback(
    (size) => {
      if (!editor) return;
      editor.chain().focus().setMark('fontSize', { fontSize: size.toString() }).run();
    },
    [editor]
  );

  const setColor = useCallback(
    (color) => {
      if (!editor) return;
      editor.chain().focus().setColor(color).run();
    },
    [editor]
  );

  if (!isMounted || !editor) {
    return (
      <div className="border rounded-lg overflow-hidden bg-white min-h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const fontSizes = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48];
  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#FFA500',
  ];

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('underline') ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleUnderline().run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('strike') ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleStrike().run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('heading', { level: 4 }) ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 4 }).run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Heading4 className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (editor) {
                editor.chain().focus().toggleBulletList().run();
              }
            }}
            className="h-8 w-8 p-0"
            type="button"
            disabled={!editor}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (editor) {
                editor.chain().focus().toggleOrderedList().run();
              }
            }}
            className="h-8 w-8 p-0"
            type="button"
            disabled={!editor}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBlockquote().run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleCodeBlock().run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign('left').run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign('center').run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign('right').run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign('justify').run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        {/* Media & Links */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant={editor.isActive('link') ? 'default' : 'ghost'}
            size="sm"
            onClick={setLink}
            className="h-8 w-8 p-0"
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleImageUpload}
            className="h-8 w-8 p-0"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Font Family */}
        <div className="flex gap-1 border-r pr-2 mr-2 relative group">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            <Type className="h-4 w-4 mr-1" />
            Font
          </Button>
          <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-50 min-w-[180px] max-h-[300px] overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            {['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Comic Sans MS', 'Impact'].map((font) => (
              <button
                key={font}
                onClick={() => editor.chain().focus().setFontFamily(font).run()}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="flex gap-1 border-r pr-2 mr-2 relative group">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            <Type className="h-4 w-4 mr-1" />
            Size
          </Button>
          <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-50 min-w-[120px] max-h-[300px] overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            {fontSizes.map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                style={{ fontSize: `${size}px` }}
              >
                {size}px
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="flex gap-1 border-r pr-2 mr-2 relative group">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Palette className="h-4 w-4" />
          </Button>
          <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-50 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setColor(color)}
                  className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <input
              type="color"
              onChange={(e) => setColor(e.target.value)}
              className="mt-2 w-full h-8 rounded border"
            />
          </div>
        </div>

        {/* Other */}
        <div className="flex gap-1 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setHorizontalRule().run();
            }}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().undo().run();
            }}
            disabled={!editor.can().undo()}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().redo().run();
            }}
            disabled={!editor.can().redo()}
            className="h-8 w-8 p-0"
            type="button"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="max-h-[800px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;

