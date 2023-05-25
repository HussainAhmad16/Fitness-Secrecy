import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import SubNavigations from "./SubNavigation";
import { SnackbarProvider, useSnackbar } from "notistack";
import Swal from "sweetalert2";
import Footer from "./Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
  });

  const [editorValue, setEditorValue] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/blog/postBlog", {
        title: inputs.title,
        description: editorValue,
        image: inputs.image,
        category: inputs.category,
        user: localStorage.getItem("userId"),
      });
      const data = await res.data;
      return { success: true, data };
    } catch (err) {
      console.log(err);
      return { success: false, error: err.message };
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    sendRequest().then((result) => {
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Blog Posted",
          text: 'Blog posted successfully! , You can check it in "My Blogs" section.',
        }).then(() => {
          console.log(result.data);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error: ${result.error}`,
        });
      }
    });
  };


  const modules = {
    toolbar: {
      container: [
        [{ font: [] }, { size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  };

  

  return (


    <div style={{ fontFamily: "Open Sans", display: "flex" }}>
     
      <div style={{ flex: "1", padding: "10px" }}>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          marginTop: "60px",
          marginBottom: "50px",
          px: 2,
          py: 4,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          backgroundColor: "white",
          scale: "0.88",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Post Your Blog
          </Typography>
          <InputLabel sx={{ mb: 2, mt: 1, fontWeight: "bold" }}>
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            label="Write the title of your blog here..."
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <InputLabel sx={{ mb: 2, mt: 1, fontWeight: "bold" }}>
            Description:
          </InputLabel>
          <ReactQuill
            value={editorValue}
            modules={modules}
            onChange={handleEditorChange}
            label="Write your blog content here..."
          />

          <InputLabel sx={{ mb: 2, mt: 1, fontWeight: "bold" }}>
            Image:
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            label="Paste the image URL here"
          />

          <InputLabel sx={{ mb: 2, mt: 1, fontWeight: "bold" }}>
            Category:
          </InputLabel>
          <TextField
            label="Enter the category of your blog post"
            name="category"
            value={inputs.category}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button variant="contained" type="submit">
              Post
            </Button>
          </Box>
        </form>
      </Box>
     </div>
    </div>
  );
};

export default AddBlog;
