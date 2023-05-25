import { Grid, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormWrapper = styled(Grid)({
  backgroundColor: '#fff',
  padding: '3rem',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
});

const InputWrapper = styled(Grid)({
  marginBottom: '1.5rem',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
});

const ContactUs = () => {
  return (
    <FormWrapper
      component="form"
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      item
      xs={10}
      md={8}
      sx={{ margin: 'auto' }}
    >
      <Typography variant="h2" sx={{ fontSize: '1.5rem', marginTop: '0rem', marginBottom: '2rem', color: '#666' }}>
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
          required
          multiline
          rows={4}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' } }}
        />
      </InputWrapper>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </FormWrapper>
  );
};

export default ContactUs;