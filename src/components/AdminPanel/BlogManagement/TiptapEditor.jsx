import React, { useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Heading3, Heading4, List, ListOrdered, Link2, FileImage as ImageIcon, Undo, Redo, Quote } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { normalizeFileName } from '@/lib/utils'; // Import the new function

const MenuBar = ({ editor }) => {
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleImageUpload = useCallback(async (event) => {
    if (!editor) return;
    const file = event.target.files[0];
    if (!file) return;

    const normalizedName = normalizeFileName(file.name);
    const fileName = `${uuidv4()}-${normalizedName}`;
    
    try {
      const { error: uploadError } = await supabase.storage.from('posts-images').upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage.from('posts-images').getPublicUrl(fileName);
      
      if (publicUrl) {
        editor.chain().focus().setImage({ src: publicUrl }).run();
        toast({ title: 'Erfolg', description: 'Bild erfolgreich hochgeladen und eingefügt.' });
      } else {
          throw new Error('Public URL konnte nicht abgerufen werden.');
      }
    } catch (error) {
      toast({ title: 'Fehler', description: `Bild-Upload fehlgeschlagen: ${error.message}`, variant: 'destructive' });
    } finally {
        if(event.target) {
            event.target.value = '';
        }
    }
  }, [editor, toast]);

  if (!editor) return null;

  const buttons = [
    { action: () => editor.chain().focus().toggleBold().run(), icon: Bold, isActive: editor.isActive('bold'), label: 'Bold' },
    { action: () => editor.chain().focus().toggleItalic().run(), icon: Italic, isActive: editor.isActive('italic'), label: 'Italic' },
    { action: () => editor.chain().focus().toggleUnderline().run(), icon: UnderlineIcon, isActive: editor.isActive('underline'), label: 'Underline' },
    { type: 'divider' },
    { action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), icon: Heading1, isActive: editor.isActive('heading', { level: 1 }), label: 'H1' },
    { action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), icon: Heading2, isActive: editor.isActive('heading', { level: 2 }), label: 'H2' },
    { action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), icon: Heading3, isActive: editor.isActive('heading', { level: 3 }), label: 'H3' },
    { action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), icon: Heading4, isActive: editor.isActive('heading', { level: 4 }), label: 'H4' },
    { type: 'divider' },
    { action: () => editor.chain().focus().toggleBulletList().run(), icon: List, isActive: editor.isActive('bulletList'), label: 'Bullet List' },
    { action: () => editor.chain().focus().toggleOrderedList().run(), icon: ListOrdered, isActive: editor.isActive('orderedList'), label: 'Ordered List' },
    { action: () => editor.chain().focus().toggleBlockquote().run(), icon: Quote, isActive: editor.isActive('blockquote'), label: 'Blockquote' },
    { type: 'divider' },
    { action: setLink, icon: Link2, isActive: editor.isActive('link'), label: 'Set Link' },
    { action: () => fileInputRef.current?.click(), icon: ImageIcon, label: 'Add Image' },
    { type: 'divider' },
    { action: () => editor.chain().focus().undo().run(), icon: Undo, label: 'Undo' },
    { action: () => editor.chain().focus().redo().run(), icon: Redo, label: 'Redo' },
  ];

  return (
    <div className="border rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-1">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />
      {buttons.map((btn, index) =>
        btn.type === 'divider' ? (
          <div key={index} className="w-px bg-gray-300 mx-1"></div>
        ) : (
          <button
            key={index}
            onClick={btn.action}
            disabled={btn.disabled}
            aria-label={btn.label}
            className={`p-2 rounded hover:bg-gray-200 ${btn.isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
          >
            <btn.icon className="w-4 h-4" />
          </button>
        )
      )}
    </div>
  );
};

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
          inline: true,
          allowBase64: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg p-4 focus:outline-none min-h-[300px]',
      },
    },
  });

  React.useEffect(() => {
    if (editor && content && JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
        editor.commands.setContent(content, false);
    }
   }, [content, editor]);

  return (
    <div className="border rounded-b-lg max-h-[600px] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white border-b">
        <MenuBar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;