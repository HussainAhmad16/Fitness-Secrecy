import { React, useState, useEffect } from "react";
import { GitHub, Instagram, Twitter, Facebook } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText, // import the Drawer component
} from "@mui/material";
import { TabList } from "@mui/lab";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/index";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Login";
import { Popover } from "@mui/material";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Padding } from "@mui/icons-material";
import { NavigationBtn } from "./NavigationBtn";
import HomeIcon from "@mui/icons-material/Home";
import BlogIcon from "@mui/icons-material/Article";
import FitnessIcon from "@mui/icons-material/FitnessCenter";
import AboutIcon from "@mui/icons-material/Info";
import ContactIcon from "@mui/icons-material/ContactSupport";
import AdminIcon from "@mui/icons-material/SupervisorAccount";
import axios from "axios";
import CreateIcon from '@mui/icons-material/Create';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';



const Buttons = styled(Button)`
  background-color: #f8f8ff;
  color: #2b2d42;
  border: none;
  border-radius: 3px;
  scale: 0.9;
  padding: 0.5rem 1rem;
  margin: 0;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #2b4d42;
    color: #f8f8ff;
  }
  @media (max-width: 768px) {
    margin: 2px;

    font-size: 10px;
  }
`;
const StyledTabs = styled(Tabs)(({ theme }) => ({
 
  "& .MuiTab-root": {
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 10px",
    transition: "color 0.2s ease-in-out",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiTab-textColorPrimary.Mui-selected": {
    color: theme.palette.primary.main,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
    height: "4px",
    borderRadius: "4px",
    marginBottom: "2px",
  },
}));


const BrandName = styled(Typography)`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const AboutContact = styled(Box)`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
  }
`;
const SimpleAboutContact = styled(Button)`
  @media (max-width: 766px) {
    font-size: 10px;
    margin: 0;
    margin-left: 4;
  }
`;



const Header = (props) => {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  const [value, setValue] = useState(0);
  const [blogAnchorEl, setBlogAnchorEl] = useState(null);
  const [plansAnchorEl, setPlansAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  let userRole;
  if (isLoggedin) {
    userRole = localStorage.getItem("userRole");
    console.log(userRole);
  }
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const currentRoute = window.location.pathname;


  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
    

      <AppBar

        sx={{
          // background: "rgba(33, 33, 33, 0.8)",
 backgroundColor:'#1C2331',    
          boxShadow: "none",
          height: "80px",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Box sx={{ my: "auto" }}>

          <Toolbar>
         {isMobile && (
  <IconButton
    color="inherit"
    aria-label="open drawer"
    edge="start"
    onClick={handleDrawerToggle}
    sx={{ mr: 2 }}
  >
    <MenuIcon />
  </IconButton>
)}

            {/* <MyDrawer isOpen={mobileOpen} onClose={handleDrawerToggle} /> */}

            <BrandName
              variant="h5"
              sx={{
                color: "white",
                whiteSpace: "nowrap",
                fontSize: "18px",
              }}
            >
              <div>FitnessSecrecy</div>

              {/* {currentRoute !== "/GymHome" && currentRoute !== "/" ? (
              // <div>FitnessSecrecy - {pageTitle}</div>
              <div>FitnessSecrecy</div>
            ) : (
              <div>FitnessSecrecy</div>
            )} */}
            </BrandName>
            
            <Box margin="auto">
              
            {(currentRoute !== '/Login' && currentRoute !== '/Signup') && (
              <>
  <StyledTabs
    value={value}
    onChange={(event, newValue) => setValue(newValue)}
    sx={{
      color: "white",
      display: isMobile ? "none" : "flex",
    }}
  >
    <Tab
      icon={<HomeIcon />}
      label="Home"
      component={Link}
      to="/"
      sx={{ color: "white" }}
    />
    <Tab
      icon={<BlogIcon />}
      label="Blogging"
   
      aria-haspopup="true"
      component={Link}
      to="blogs"
      sx={{ color: "white" }}
    />
    <Tab
      icon={<FitnessIcon />}
      label="Fitness Plans"
 
      aria-haspopup="true"
      component={Link}
      to='FitnessPlans'
      sx={{ color: "white" }}
    />
    <Tab
      icon={<AboutIcon />}
      label="About Us"
      component={Link}
      to="/AboutUs"
      sx={{ color: "white" }}
    />
    <Tab
      icon={<ContactIcon />}
      label="Contact Us"
      component={Link}
      to="/ContactUs"
      sx={{ color: "white" }}
    />
    {userRole === 'admin' ? (
      <Tab
        icon={<AdminIcon />}
        label="Admin Panel"
        component={Link}
        to="/AdminDashboard"
        sx={{ color: "white" }}
      />
    ) : (
      <Tab
        icon={<AdminIcon />}
        label="Admin Panel"
        component={Link}
        to="/AdminDashboard"
        sx={{ color: "white", display:'none' }}
      />
    )}
  </StyledTabs></>
)}


           
            </Box>

            <AboutContact>
              <Box sx={{ display: "flex", flexGrow: 1, ml: "auto" }}>
                <IconButton
                  aria-label="youtube"
                  color="inherit"
                  component="a"
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener"
                >
                  <YouTubeIcon />
                </IconButton>
                <IconButton
                  aria-label="instagram"
                  color="inherit"
                  component="a"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  aria-label="twitter"
                  color="inherit"
                  component="a"
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener"
                >
                  <Twitter /> </IconButton>
                <IconButton
                  aria-label="facebook"
                  color="inherit"
                  component="a"
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener"
                >
                  <Facebook /> </IconButton>


                {!isLoggedin && currentRoute !== "/" && (
                  <>
                    <Buttons sx={{ ml: 1 }} component={Link} to="/Login">
                      Login
                    </Buttons>
                    <Buttons sx={{ ml: 1 }} component={Link} to="/Signup">
                      Signup
                    </Buttons>
                  </>
                )}

                {isLoggedin && (
                  <IconButton
                    onClick={() => dispatch(authActions.logout())}
                    variant="contained"
                    component={Link}
                    to="/"
                    sx={{ color: "coral" }}
                  >
                    Logout <ExitToAppIcon />
                  </IconButton>
                )}
              </Box>
            </AboutContact>
          </Toolbar>
        </Box>
      </AppBar>
      <Drawer
  anchor="left"
  open={mobileOpen}
  onClose={handleDrawerToggle}
  sx={{
    width: "200px",
    "& .MuiListItem-root": {
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#64b5f6",
      },
    },
  }}
>
  <List sx={{ marginTop: 10 ,backgroundColor: "#1C2331",height:'100vh',display:'flex' , flexDirection:'column',alignItems:'center', width:'200px'}}>
    <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
      <ListItemIcon>
        <HomeIcon sx={{color:'white'}} />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={Link} to="/blogs" onClick={handleDrawerToggle}>
      <ListItemIcon>
        <CreateIcon sx={{color:'white'}} />
      </ListItemIcon>
      <ListItemText primary="Blogging" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/FitnessPlans"
      onClick={handleDrawerToggle}
    >
      <ListItemIcon>
        <FitnessCenterIcon sx={{color:'white'}}/>
      </ListItemIcon>
      <ListItemText primary="Fitness Plans" />
    </ListItem>
    <ListItem button component={Link} to="/AboutUs" onClick={handleDrawerToggle}>
      <ListItemIcon>
        <InfoIcon sx={{color:'white'}} />
      </ListItemIcon>
      <ListItemText primary="About Us" />
    </ListItem>
    <ListItem
      button
      component={Link}
      to="/ContactUs"
      onClick={handleDrawerToggle}
    >
      <ListItemIcon>
        <MailIcon sx={{color:'white'}} />
      </ListItemIcon>
      <ListItemText primary="Contact Us" />
    </ListItem>
    {userRole === "admin" && (
      <ListItem
        button
        component={Link}
        to="/AdminDashboard"
        onClick={handleDrawerToggle}
      >
        <ListItemIcon>
          <AdminPanelSettingsIcon sx={{color:'white'}} />
        </ListItemIcon>
        <ListItemText primary="Admin Panel" />
      </ListItem>
    )}
  </List>
</Drawer>

    </Box>
  );
};

export default Header;
