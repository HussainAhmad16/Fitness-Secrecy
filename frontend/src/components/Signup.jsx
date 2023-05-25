import { TextField, Typography, Button, Box, styled } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Footer from "./Footer";
import { NavigationBtn } from "./NavigationBtn";
import axios from "axios";
import Swal from 'sweetalert2';
const Buttons = styled(Button)`
  background-color: #2B2D42;
  color: #F8F8FF;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 6rem;
  margin: 0 1rem;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  &:hover {
    background-color:#2B4D42 ;
    color:#white ;
  }
`;

const CreateAccountButton = styled(Button)`
  background-color: none;
  color: grey;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  cursor: pointer;
  text-transform: none;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 1px;

  &:hover {
    background-color: none;
    background: none;
    color: #2B8D42;
  }
`;

const Signup = () => {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [signupError, setSignupError] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    try {

      const res = await axios.post("http://localhost:5000/api/user/signup", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
      });
      const data = res.data;
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Account Created Successfully !',
      })
      navigate("/");
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Signup failed ! ', { variant: 'error' });
    }
  };
  
  
  return (
    
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <NavigationBtn />
      
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 2px 8px rgba(0, 0, 0, 0.2)"
            width={380}
            margin="auto"
            marginTop={12}
            marginBottom={3}
            padding={3}
            paddingBottom={5}
            borderRadius="10px"
            backgroundColor='white'
          >
          <Typography variant="h5">Signup</Typography>
          <TextField
            name="name"
            onChange={handleChange}
            type={"name"}
            value={inputs.name}
            id="standard-basic"
            label="Name"
            variant="standard"
            sx={{ mb: 1, width: "70%" }}
          />
          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            id="standard-basic"
            value={inputs.email}
            label="Email"
            variant="standard"
            sx={{ mb: 1, width: "70%" }}
          />
          <TextField
            name="password"
            onChange={handleChange}
            type={"password"}
            id="standard-basic"
            value={inputs.password}
            label="Password"
            variant="standard"
            sx={{ mb: 3, width: "70%" }}
          />
           <TextField
              name="confirmPassword"
              onChange={handleChange}
              type={"password"}
              id="standard-basic"
              value={inputs.confirmPassword}
              label="Confirm Password"
              variant="standard"
              sx={{ mb: 1, width: "70%" }}
            />
          <Buttons type="submit" onClick={handleSubmit}  variant="contained" sx={{ m: 4,mb:2}}>
            Sign up
          </Buttons>

          <CreateAccountButton component={Link} to="/Login" sx={{marginTop:"0px"}}>Already Have An Account !</CreateAccountButton>
    </Box>
      
      </form>
     
    </div> 
  );
};

export default Signup;
