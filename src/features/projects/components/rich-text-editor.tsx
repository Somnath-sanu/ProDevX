/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
} from "lucide-react";
import Heading from "@tiptap/extension-heading"


const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-1 flex flex-wrap gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>

      <div className="w-px h-4 bg-border mx-1 my-auto" />

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      {/* <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
      >
        <AlignRight className="h-4 w-4" />
      </Toggle> */}
    </div>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[150px] p-4 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-md overflow-hidden bg-background">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
