import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const DietPlanCard = ({ title, description, image ,id}) => {

  const navigate = useNavigate();

  const handleReadMore=()=>{

navigate(`/BuyDietPlan/${id}`);

  }

  const handleBuy = ()=>{
    
  }

  return (
    <Box sx={{ margin: 'auto', px: '50px' }}>
      <LockedCard sx={{ maxWidth: 345, height: '100%' }}>
        <LockOverlay>
          <LockIcon />
          <Typography variant="h6" sx={{ ml: 1 }}>
            Buy to Unlock
          </Typography>
        </LockOverlay>
        <CardMedia component="img" height="200" image={image} alt={title} />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: description.slice(0,200) }} variant="body2" color="text.secondary" sx={{ mb: 2 }}></Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button onClick={handleBuy} variant="contained" color="primary">
                Buy Now
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={handleReadMore} variant="outlined">Read More</Button>
            </Grid>
          </Grid>
        </CardContent>
      </LockedCard>
    </Box>
  );
};

const LockedCard = styled(Card)({
  position: 'relative',
  borderRadius: '10px',
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.8,
    transition: 'opacity 0.3s ease-in-out',
    borderRadius: '10px',
  },
  '&:hover:before': {
    opacity: 1,
  },
});

const LockOverlay = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
 
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  color: '#fff',
  textAlign: 'center',
  borderRadius: '10px',
  padding: '5px 10px',
  backgroundColor: '#212121',
});

export default DietPlanCard;
