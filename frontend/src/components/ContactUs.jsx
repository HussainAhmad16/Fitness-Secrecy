import { Grid, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Footer from './Footer.jsx';
import { useState } from 'react';
import axios from 'axios';


const ContactUsWrapper = styled(Grid)({
  minHeight: '100vh',
});

const FormWrapper = styled(Grid)({
  backgroundColor: '#fff',
  padding: '3rem',
  paddingTop:'1.5rem',
  paddingBottom:'1.5rem',
  marginBottom:"50px",
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
});

const InputWrapper = styled(Grid)({
  marginBottom: '1.5rem',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
});

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
  
  <div style={{marginTop:'50px'}}>
    
    <ContactUsWrapper container justifyContent="center" alignItems="start" >
    <Typography variant="h1" sx={{ fontSize: '2rem', marginTop:"80px", color: '#333' }}>
          Contact Us:
        </Typography>
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center',marginTop:"80px" }}>
        <FormWrapper
          component="form"
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          onSubmit={handleSubmit}
          item
          xs={10}
          md={8}
          sx={{margin:"auto"}}
        >
          <Typography variant="h2" sx={{ fontSize: '1.5rem',marginTop:"0rem", marginBottom: '2rem',color: '#666' }}>
          Get in touch with us via form submission
          </Typography>
          <InputWrapper item xs={12}>
            <TextField
              fullWidth
              label="Name"
              id="name"
              name="name"
              required
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' } }}
            />
          </InputWrapper>
          <InputWrapper item xs={12}>
            <TextField
              fullWidth
              label="Email"
              id="email"
              name="email"
              required
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' } }}
            />
          </InputWrapper>
          <InputWrapper item xs={12}>
            <TextField
              fullWidth
              label="Message"
              id="message"
              name="message"
              rows={3}
              required
              multiline
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': {fontSize:"15px", borderRadius: '5px',padding:"2rem 1.8rem", boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' } }}
            />
          </InputWrapper>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '5px',
              padding: '0.5rem 6rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              '&:hover': { backgroundColor: '#333'
              },
            }}
            >
            Submit
            </Button>
            </FormWrapper>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:"80px" }}>
            <Typography variant="h2" sx={{ fontSize: '1.5rem', marginTop: '1rem', color: '#666' }}>
            Or contact us through:
            </Typography>
            <Typography variant="h3" sx={{ fontSize: '1.3rem', marginTop: '1rem', color: '#333' }}>
            <FaWhatsapp /> +923497224297
            </Typography>
            <Typography variant="h3" sx={{ fontSize: '1.3rem', marginTop: '1rem', color: '#333' }}>
            <MdEmail /> FitnessSecrecy@gmail.com
            </Typography>
            </Grid>
            </ContactUsWrapper>
            </div>);
            };
            
            export default ContactUs;