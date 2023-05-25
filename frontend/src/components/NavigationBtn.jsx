import React from 'react'
import { TextField, Typography, Button, Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const NavButtonBack = styled(Button)({
  position: "absolute",
  top: 100,
  left: 0,
  zIndex: 1,
  textTransform: "none",
  color: "#2B4D42",
  borderRadius: "50%",
  width: 50,
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 24,
  fontWeight: "bold",
  padding: "12px",
  "&:hover": {
    color:"dark green"
  },
});

const NavButtonForward = styled(Button)({
  position: "absolute",
  top: 100,
  left: 40,
  zIndex: 1,
  color: "#2B4D42",
  borderRadius: "50%",
  width: 50,
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 24,
  fontWeight: "bold",
  padding: "12px",
  "&:hover": {
   color:"dark green"
  },
});

export const NavigationBtn = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavButtonBack onClick={() => navigate(-1)}><ArrowBack /></NavButtonBack>
      <NavButtonForward onClick={() => navigate(1)}><ArrowForward /></NavButtonForward>
    </div>
  )
}