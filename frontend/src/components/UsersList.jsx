import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import Loader from "./Loader";
import { Box, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user');
      const data = res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    sendRequest()
      .then((data) => {
        setUsers(data);
        setLoading(false); // set loading state to false
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false); // set loading state to false in case of error
      });
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography color="error" variant="h4">{error}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer sx={{marginTop:'10%'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {users && users.data && Array.isArray(users.data) ? (
    users.data.map((user) => (
      <TableRow key={user._id}>
        <TableCell component="th" scope="row">
          {user.username}
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={3}>
        <Typography>User data not found</Typography>
      </TableCell>
    </TableRow>
  )}
</TableBody>

      </Table>
    </TableContainer>
  );
  
  
};

export default UsersList;
