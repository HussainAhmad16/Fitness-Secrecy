import React, { useState } from "react";
import gymBackground from "./images/gym-background.jpg";
import { Button, Grid,Card, CardContent,Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { NavigationBtn } from "./NavigationBtn";

import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Login from "./Login";
import Footer from "./Footer";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DietPlanList from "./DietPlansList";
import { FitnessCenter, Build, LocalPharmacy, Person } from '@mui/icons-material';
const Buttons = styled(Button)`
  background-color: #F8F8FF;
  color: #2B2D42;
  border: none;
  border-radius: 3px;
  padding: 0.7rem 1.5rem;
  margin: 0 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-transform:none;
  
  &:hover {
    background-color: #2B4D42;
    color: #F8F8FF;
  }

  @media(max-width:768px){
   padding: 0.6 0.8rem;
   font-size: 0.8rem;
   margin:3px;
  }
`;

const Background = styled(Box)`
  background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url(${gymBackground});
  background-size: 100% 115vh;
  background-position: right;
  background-repeat: no-repeat;
  height: 115vh;

  @media (max-width: 1024px) {
    background-size: 100% 100%;
  }
`;

const Content = styled(Box)`
  background: #0000008f;
  padding: 4rem;
  width: 100%;
  margin: 0 3rem;
  text-align: center;
  height: 115vh;
  margin-left: 0;

  @media (max-width: 1024px) {
    width: 100%;
    margin: 0;
    padding: 2rem 1rem;
    background:linear-gradient(135deg, #2B2D42 0%, #8D99AE 100%);
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #F8F8FF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  margin-top: 70px;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-top: 150px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #F8F8FF;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  margin: 0 auto 2rem auto;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
}`;
const PlansContainer = styled(Grid)`
  background-color: #f9f9f9;
  padding: 50px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TrainingTitle = styled(Typography)`
  color: #333333;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`;

const PlanCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: all 0.3s ease-in-out;
  margin: auto;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const PlanCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const PlanTitle = styled(Typography)`
  color: #333333;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const PlanSubtitle = styled(Typography)`
  color: #666666;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
const GymHome = () => {
  const navigate = useNavigate();
  // const [showLoginForm, setShowLoginForm] = useState(false);
  // const [showSignupForm, setShowSignupForm] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  // const handleShowLoginForm = () => {
  //   setShowLoginForm(true);
  //   setShowSignupForm(false);
  // };

  // const handleShowSignupForm = () => {
  //   setShowSignupForm(true);
  //   setShowLoginForm(false);
  // };

  return ( 
    <div>
     
    
      <Background> 
      {!isLoggedin ? (
     <>
      <Content>
  <Title>FitnessSecrecy</Title>
  <Subtitle>
    We are dedicated to helping you achieve your fitness goals. With
    experienced trainers, we'll help you get in shape and stay healthy.
    <br /><br />
    Sign up today and start your fitness journey!
  </Subtitle>
 
    
      <Buttons  component={Link} to="/login">
        Login
      </Buttons>
      <Buttons  component={Link} to="/signup">
        Sign Up Now
      </Buttons>
      </Content>
   
    </>
  
  ) : (
    <>
    <Content>
  <Title>FitnessSecrecy</Title>
  <Subtitle>
    We are dedicated to helping you achieve your fitness goals. With
    experienced trainers, we'll help you get in shape and stay healthy.
  
  </Subtitle>
    <Buttons component={Link} to="/FitnessPlans"  endIcon={<FitnessCenterIcon />}>
      Explore to be Fit
    </Buttons>
    <Buttons component={Link} to="/FitnessPlans"   endIcon={<TrendingUpIcon />}>
      Explore Fitness Industry
    </Buttons>
    </Content>
   
  </>
  )}
   </Background>
      
     
   <Box sx={{ marginTop: '2rem' , padding:'10px' }}>
        <Typography variant="subtitle1" sx={{textAlign:'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Our Services
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <Box
            sx={{
              padding: '1.5rem',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Training Plans
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem', color: '#707070' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus placerat justo vel fringilla eleifend.
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '1.5rem',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Provides Fitness Tools
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem', color: '#707070' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus placerat justo vel fringilla eleifend.
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '1.5rem',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Provides Supplements
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem', color: '#707070' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus placerat justo vel fringilla eleifend.
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '1.5rem',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Personal Training
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem', color: '#707070' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus placerat justo vel fringilla eleifend.
            </Typography>
          </Box>
          {/* Add more service boxes as needed */}
        </Box>
      </Box>
   
    </div>
  );
};



export default GymHome;
