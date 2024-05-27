import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillResizeImage from "quill-resize-image";
Quill.register("modules/resize", QuillResizeImage);

const Editor = ({blogBody, setBlogBody}) => {

  const Editor = {
    modules: {
      toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
      ],
      resize: {
        locale: {},
      },
    }
  }

  return (
    <>
      <div className="m-auto box-border">
        <ReactQuill 
          theme="snow" 
          className="bg-background" 
          modules={Editor.modules}
          placeholder="Blog content here..."
          onChange={setBlogBody}
          value={blogBody}
        />
      </div>
      {/* <div>
        <div dangerouslySetInnerHTML={{ __html: blogBody }} />
      </div> */}
    </>
  );
};

export default Editor;
