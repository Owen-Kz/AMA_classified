const quill = new Quill("#editor", {
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      ["link", "blockquote", "code-block", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      // [{ header: [1, 2, false] }],
      // [{ align: [] }],
     
    ],
    
  },
  theme: "snow",
});