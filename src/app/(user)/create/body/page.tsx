"use client";

import "../../editor.css";
import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreatePageBody = () => {
  return (
    <AnimatedPageOpacity>
      <h1 className="page-title">Create</h1>
      <div className="editor text-text-dark">
        {/* <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor&nbsp;5!</p>"
          config={{
            toolbar: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "blockquote",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "table",
              "image",
              "mediaEmbed"
            ]
          }}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        /> */}
      </div>
    </AnimatedPageOpacity>
  );
};

export default CreatePageBody;
