const quill = new Quill("#quill", {
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      // [{ header: [1, 2, false] }],
      // [{ align: [] }],
     
    ],
    
  },
  theme: "snow",
});

export {
  quill
}