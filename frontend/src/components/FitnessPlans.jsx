import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const FitnessPlans = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(to bottom, #F5F5F5, #ECEFF1)',
   
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          maxWidth: '600px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          marginTop:'100px'
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: '2.5rem',
           
            marginBottom: '1.5rem',
            color: '#1C2331',
            letterSpacing: '1px',
            textAlign: 'center',
          }}
        >
          Fitness Training Plans
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontSize: '1.25rem',
            marginBottom: '2.5rem',
            color: '#707070',
            lineHeight: '1.5',
            textAlign: 'center',
          }}
        >
          Our fitness training plans are designed to help you achieve your health and fitness goals. Whether you're looking to build muscle, lose weight, or improve overall fitness, we have a plan that suits your needs.
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: '2.5rem',
            
            marginBottom: '1.5rem',
            color: '#1C2331',
            letterSpacing: '1px',
            textAlign: 'center',
          }}
        >
          Diet Plans
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontSize: '1.25rem',
            marginBottom: '2.5rem',
            color: '#707070',
            lineHeight: '1.5',
            textAlign: 'center',
          }}
        >
          In addition to our training plans, we also offer personalized diet plans to complement your fitness journey. Our diet plans are tailored to your specific nutritional needs and goals, ensuring you get the right balance of nutrients for optimal performance and results.
        </Typography>
      </Paper>
    </Box>
  );
};

export default FitnessPlans;
