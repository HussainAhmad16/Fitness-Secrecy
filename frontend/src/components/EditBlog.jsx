import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const EditBlog = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Add useSnackbar hook to access the Snackbar component
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
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = useParams().id;

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
      const data = await res.data;
      setBlog(data.blog);
      setLoading(false);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
        category: data.blog.category,
      });
      setEditorValue(data.blog.description); // set initial value of the editor
    } catch (err) {
      // Set the error state and display an error message using useSnackbar hook
      setError(err.message);
      setLoading(false);
      enqueueSnackbar('Error loading blog data', { variant: 'error' });
    }
  };
  

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const sendRequest = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/blog/updateBlog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          category: inputs.category,
        }
      );
      const data = await res.data;
      return data;
    } catch (err) {
      // If there is an error, display an error message using the useSnackbar hook
      console.error(err);
      enqueueSnackbar('Error updating blog', { variant: 'error' });
    }
  };
  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      description: editorValue,
    }));
  }, [editorValue]);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data)).then(() => {
      navigate('/UserBlogs');
      enqueueSnackbar('Blog updated successfully !', { variant: 'success' });
    });
  };
  return (
    <div >
     {inputs &&
      
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          marginTop:"80px",
          marginBottom:"50px",
          px: 2,
          py: 4,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
      >
          {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" sx={{ mb: 2 }}>Edit or Update Your Blog</Typography>
          <InputLabel sx={{ mb: 1,mt:1,fontWeight:"bold" }}>Title</InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange} variant="outlined" fullWidth />
    
          <InputLabel sx={{ mb: 2,mt:1,fontWeight:"bold" }}>Description:</InputLabel>
          <ReactQuill value={editorValue} onChange={handleEditorChange} label="Write your blog content here..." />

          <InputLabel sx={{ mb: 1,mt:1,fontWeight:"bold" }}>Image:</InputLabel>
          <TextField  InputProps={{readOnly: false,}}
           name="image" value={inputs.image} onChange={handleChange} variant="outlined" fullWidth />
    
          <InputLabel sx={{ mb: 1,mt:1,fontWeight:"bold" }}>Category:</InputLabel>
          <TextField name="category" value={inputs.category} onChange={handleChange} variant="outlined" fullWidth />

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button variant="contained" type="submit" >Update</Button>
          </Box>
        </form>
      </Box>}
    </div>
  );
};

export default EditBlog;
