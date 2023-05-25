import { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Grid, Paper, styled } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import UsersList from './UsersList';

const drawerWidth = 240;

const RootContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop:'100px',
  height: '100vh'
  
}));

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,   
  flexShrink: 0,
  marginTop:'200px !important' 
}));

const DrawerPaper = styled('div')(({ theme }) => ({
  width: drawerWidth,
}));

const ContentContainer = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const CardContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AdminDashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:5000/api/user/userCount');
      const data = await response.json();
      setUsersCount(data.count);
    };
    fetchUsers();
  }, []);
  
  return (
    <RootContainer>
    
   

      <ContentContainer>
      <h1
        style={{
          padding: "5px",
          color: "#2B4D42",
          textShadow: "2px 2px white",
          textAlign: "center",
          marginTop: "0px",
          marginBottom:'30px'
        }}
      >
       Admin Panel
      </h1>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Link to='/UsersList' >
            <CardContainer>
              <Typography variant="h5" gutterBottom>
                Users
              </Typography>
              <Typography variant="h2">{usersCount}</Typography>
            </CardContainer></Link>
          </Grid>
         
        </Grid>
      </ContentContainer>
    </RootContainer>
  );
};

export default AdminDashboard;
