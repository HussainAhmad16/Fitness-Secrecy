import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, Box, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import Footer from './Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loader from './Loader';

const ErrorMessage = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  color: '#f44336',
  fontWeight: 'bold',
  marginTop: '0.5rem',
});

export const CreatePlan = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // add a new state variable for form submission status

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    image: '',
    calories: '',
    carbs: '',
    protein: '',
    fats: '',
    quillRef: null,
    isMounted: false,
  });

  const [editorValue, setEditorValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
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

  const handlePhoto = (e) => {
    setInputs({ ...inputs, image: e.target.files[0] });
    console.log(setInputs.image);
  };

  const handleSubmit = (event) => {
    setIsSubmitting(true); // set the form submission status to true
    event.preventDefault();
    const user = localStorage.getItem('userId');

    // convert image file to Base64 string
    const reader = new FileReader();
    reader.readAsDataURL(inputs.image);
    reader.onload = () => {
      const imageString = reader.result;

      axios
        .post('http://localhost:5000/api/plans/postDietPlan', {
          name: inputs.name,
          description: editorValue,
          image: imageString,
          calories: inputs.calories,
          carbs: inputs.carbs,
          protein: inputs.protein,
          fats: inputs.fats,
          category: inputs.category,
          user: user,
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Diet Plan Created And Posted Successfully!',
              showConfirmButton: true,
              confirmButtonText: 'OK',
            });

            setIsSubmitting(false); // set the form submission status back to false
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error saving data',
              text: `Status code: ${response.status}`,
              confirmButtonText: 'OK',
            });
          }
        })
        .catch((error) => {
          console.error('Error saving data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error saving data',
            text: error.message,
            confirmButtonText: 'OK',
          });
        });
    };
  };

  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      isMounted: true,
    }));

    return () => {
      console.log('ReactQuill unmounted');
      setInputs((prevState) => ({
        ...prevState,
        isMounted: false,
      }));
    };
  }, []);

  return (
    <Box>
      {isSubmitting && <Loader />}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 1200,
            mx: 'auto',
            marginTop: '120px',
            marginBottom: '50px',
            p: 5,
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            backgroundColor: 'white',
            width: '100%',
          }}
        >
          <Typography variant="h5" sx={{ mb: 5 }}>
            Create a Diet Plan
          </Typography>

          <Box
            marginBottom={2}
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '20px',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <InputLabel sx={{ mb: 2, mt: 1, fontWeight: 'bold' }}>Name:</InputLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={inputs.name}
                onChange={handleChange}
                label="Plan Name/Title Here..."
                name="name"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <InputLabel sx={{ mb: 2, mt: 1, fontWeight: 'bold' }}>Description:</InputLabel>
              <ReactQuill
                value={editorValue}
                modules={modules}
                onChange={handleEditorChange}
                label="Write your Plan description here..."
                style={{  width: '100%', wordWrap: 'break-word' }}
                name="description"
              />
            </Box>
          </Box>

          <Box
            marginBottom={2}
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '20px',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TextField
                type="file"
                variant="outlined"
                label="Image"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  accept: 'image/*',
                  onChange: handlePhoto,
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="outlined"
                type="number"
                required
                fullWidth
                value={inputs.calories}
                onChange={handleChange}
                label="Calories"
                name="calories"
              />
            </Box>
          </Box>

          <Box
            marginBottom={2}
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '20px',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="outlined"
                type="number"
                required
                fullWidth
                value={inputs.carbs}
                onChange={handleChange}
                label="Carbs"
                name="carbs"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="outlined"
                type="number"
                required
                fullWidth
                value={inputs.protein}
                onChange={handleChange}
                label="Protein"
                name="protein"
              />
            </Box>
          </Box>

          <Box
            marginBottom={2}
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '20px',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <TextField
                variant="outlined"
                type="number"
                required
                fullWidth
                value={inputs.fats}
                onChange={handleChange}
                label="Fats"
                name="fats"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Plan Category</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  value={inputs.category}
                  label="Select Plan Category"
                  onChange={handleChange}
                  name="category"
                >
                  <MenuItem value="Training Plan">Training Plan</MenuItem>
                  <MenuItem value="Diet Plan">Diet Plan</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button  variant="contained" type="submit">
              Create Plan
            </Button>
          </Box>
        </Box>
      </form>
      <Footer />
    </Box>
  );
};

export default CreatePlan;
