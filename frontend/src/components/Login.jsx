import { TextField, Typography, Button, Box, styled } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { Link,useNavigate } from "react-router-dom";
import { NavigationBtn } from "./NavigationBtn";
import { SnackbarProvider, useSnackbar } from 'notistack';
import Footer from "./Footer";


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
  
}`;
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
;

  &:hover {
    background-color: none;
    background: none;

    color: #2B8D42;
    
  }
`;

const HomeButton = styled(Button)`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: none;
  color: #2B2D42;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 1rem;
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
const Login = ({ showBackground = true }) => {
  const currentPath=window.location.pathname
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });
 
  const handelChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      return {
        userId: data.user._id,
        userRole: data.user.role, // assuming the API returns the user role in the response
      };
    } catch (err) {
      console.log(err);
    }
  };
  
  const [loginError, setLoginError] = useState(false);

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(inputs);

  sendRequest()
    .then((data) => {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("userRole", data.userRole);
    })
    .then(() => dispatch(authActions.login()))
    .then(() => navigate("/"))
    .then(() => {
      enqueueSnackbar('Login successful!', { variant: 'success' });
    })
    .catch((error) => {
      enqueueSnackbar('Login failed ! ', { variant: 'error' });
      setLoginError(true);
      console.error(error);
    });
};


  return ( 
   
   
    <div
      style={{
       
     
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      margin:"auto"


      }}
    >
        <HomeButton component={Link} to="/" sx={{ zIndex: 1 }}>
        Home
      </HomeButton>

      <form onSubmit={handleSubmit} >
     
      <Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  boxShadow="0px 2px 8px rgba(0, 0, 0, 0.2)"
  width={380}
          margin="auto"
          marginTop={16}
          marginBottom={10}
  padding={3}
  paddingBottom={5}
  borderRadius="10px"
  backgroundColor='white'
>
          <Typography variant="h5">
             Login
          
          </Typography>
        <TextField name="email" onChange={handelChange} type={"email"} id="standard-basic" value={inputs.email} label="Email" variant="standard"  sx={{ mb: 1 ,width:"70%" }} />
          <TextField name="password" onChange={handelChange} type={"password"} id="standard-basic" value={inputs.password} label="Password" variant="standard"  sx={{ mb: 1  ,width:"70%"}} />

          {loginError && (
          <Typography variant="" mx={6.5} my={2} color="error">
            Please Check Your Credentials <br /> if the issue still happens kindly contact to the technical team
          </Typography>
        )}

          <Buttons  type="submit"  variant="contained" sx={{ m: 4,mb:2,fontWeight:"bold"  }}>Login</Buttons>
          <CreateAccountButton component={Link} to="/Signup" sx={{marginTop:"0px"}}>Create Account !</CreateAccountButton>

                    
 </Box>
      </form>
   
    </div>
  );
};

export default Login;
