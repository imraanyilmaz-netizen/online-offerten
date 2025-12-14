import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const TiptapRenderer = ({ jsonContent }) => {
  const editor = useEditor({
    editable: false,
    content: jsonContent,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      Image.configure({
        allowBase64: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none',
      },
    },
  }, [jsonContent]);

  return <EditorContent editor={editor} />;
};

export default TiptapRenderer;