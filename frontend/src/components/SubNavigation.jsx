import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemText, styled } from "@mui/material";

const SubNavigationContainer = styled(Box)(({ theme ,footerHeight}) => ({
  // backgroundColor: "#1C2331",
  padding: theme.spacing(2),
  marginTop: theme.spacing(10),
  display: "flex",
  position: "fixed",
  top: 0, // Align to the top
  left: 0, // Align to the left
  justifyContent: "flex-start",
  alignItems: "flex-start",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  zIndex: 999,
}));


const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&.MuiListItem-root": {
    "&.MuiButtonBase-root": {
      borderRadius: theme.spacing(1),
      marginBottom: theme.spacing(1),
      transition: "background-color 0.3s ease-in-out",
      "&:hover": {
        backgroundColor: 'white',
      },
    },
  },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "bold",
    color: 'grey', // Set the default text color to black
  },
 
}));


const SubNavigation = ({ links  }) => {
  return (
    <SubNavigationContainer>
      <List component="nav">
        {links.map((link, index) => (
          <StyledListItem
            key={index}
            component={Link}
            to={link.url}
            href="#"
            button
          >
            <StyledListItemText primary={link.label} />
          </StyledListItem>
        ))}
      </List>
    </SubNavigationContainer>
  );
};

export default SubNavigation;
