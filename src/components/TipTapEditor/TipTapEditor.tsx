import React, { useEffect } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'
import EditorButton from "./EditorButtons"

const TipTapEditor = (props: any) => {
    const { value, onChange, onBlur } = props
    const editor = useEditor({
      extensions: [
        StarterKit,
        Link,
      ],
      content: value,
      onUpdate: ({ editor }): void => onChange(editor.getHTML()),
      onBlur: ({ editor }): void => onBlur(),
    })
  
    // useEffect(() => {
    //   editor?.commands?.setContent(value)
    // }, [value,editor])
  
    return (
      <>
        <EditorButton editor={editor} />
        <EditorContent editor={editor} />
      </>
    )
  }

export default TipTapEditor