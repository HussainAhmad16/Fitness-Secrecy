import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from './Loader';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from '@mui/icons-material/Image';
import axios from 'axios';
import { useMediaQuery, useTheme } from '@mui/material';



const BuyDietPlan = () => {
  const theme = useTheme();
  const [dietPlan, setDietPlan] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();

  const { id } = useParams();

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`http://localhost:5000/api/plans/${id}`);
        const data = await res.data;
        setDietPlan(data.dietPlan);

      } catch (err) {
        console.error(err);
        setError('Request Failed. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDietPlan();
  }, [id]);

  const handlePurchase = async () => {
    try {
      // make the purchase request here
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box mt={15}>
      {error ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh', m: '80px' }}>
          <Typography color="error" variant="h4">{error}</Typography>
        </Box>
      ) : isLoading ? (
        <Loader />
      ) : dietPlan ? (
        <>
          <Typography variant="h3" mb={2} sx={{ ml: '30px', fontWeight: 'bold', color: '#333' }}>
            {dietPlan.name}
          </Typography>

          <Grid container spacing={4} p={5}>
            <Grid item xs={12} md={6} m={0}>
              <Box display="flex" alignItems="center">
                {!isLoading && !dietPlan.image && <Image sx={{ fontSize: 80 }} />}
                <Box>
                  {dietPlan.image ? (
                    <img src={dietPlan.image} alt={dietPlan.name} style={{ width: '100%' }} />
                  ) : (
                    <Typography>No image available</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} >
            <Box sx={{ ml: isMobile ? '0%' : '10%' }}>

              <Box>
                <Typography variant="h5" mb={2}>
                  Nutrition Facts:
                </Typography>
                <Box>
                  <Typography>Calories: {dietPlan.calories}</Typography>
                  <Typography>Carbs: {dietPlan.carbs}</Typography>
                  <Typography>Protein: {dietPlan.protein}</Typography>
                  <Typography>Fats: {dietPlan.fats}</Typography>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography variant="h5" mb={2}>
                  Requirement:
                </Typography>
                <Box>
                  <Typography>{dietPlan.requirement}</Typography>
                </Box>
              </Box>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handlePurchase}>
                  Buy Now
                </Button>
              </Box>
              </Box>
            </Grid>
            <Grid md={6}><Box ml={4.5} mt={2}>
              <Typography variant="h5" mb={2}>
                Description:
              </Typography>
              <Typography dangerouslySetInnerHTML={{ __html: dietPlan.description }}></Typography>
            </Box></Grid>
          </Grid>
        </>
      ) : (
        <Typography>No diet plan found</Typography>
      )}
    </Box>
  );
};

export default BuyDietPlan;

