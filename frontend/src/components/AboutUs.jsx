import React from 'react';
import styled from '@emotion/styled';
import { Typography, Box, Grid } from '@mui/material';

import Footer from './Footer';

const Container = styled.div`
  padding: 16px;
`;

const Heading = styled(Typography)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 16px;
margin-top:80px;
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const Subheading = styled(Typography)`
  font-size: 1.5rem;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

const MemberContainer = styled(Grid)`
  margin-bottom: 64px;
`;

const MemberImage = styled.img`
  width: 100%;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const MemberName = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

const MemberTitle = styled(Typography)`
  font-size: 1.25rem;
  color: #6b7280;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const AboutUs = () => {
  return (<div>
    <Container>
      <Heading variant="h1" align="center">
        About Us
      </Heading>
      <Subheading variant="h3" align="center">
        We are dedicated to helping you achieve your fitness goals.
      </Subheading>
      <Grid container spacing={4} justify="center">
        <MemberContainer item xs={12} sm={6} md={4}>
          <MemberImage src="https://www.trainer.ae/articles/wp-content/uploads/2015/05/personal-trainer.jpg" alt="Team Member 1" />
          <MemberName variant="h2" align="center">
            John Doe
          </MemberName>
          <MemberTitle variant="subtitle1" align="center">
            Fitness Trainer
          </MemberTitle>
        </MemberContainer>
        <MemberContainer item xs={12} sm={6} md={4}>
          <MemberImage src="https://tse1.mm.bing.net/th?id=OIP.IeAoCdtmlzgo_n9mnW6bxQHaE9&pid=Api&P=0" alt="Team Member 2" />
          <MemberName variant="h2" align="center">
            Jane Doe
          </MemberName>
          <MemberTitle variant="subtitle1" align="center">
            Nutritionist
          </MemberTitle>
        </MemberContainer>
      </Grid>
    </Container>
    <Footer />
    </div>
  );
};

export default AboutUs;
