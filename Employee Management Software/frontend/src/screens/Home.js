import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import '../App.css'
import { Box ,Typography} from '@mui/material';
import { useDispatch,useSelector } from 'react-redux';
import { fetchAllUsers } from '../redux/slices/employeeSlice';
import { fetchAllDepartments } from '../redux/slices/departmantSlice';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
const Home = () => {
  const dispatch=useDispatch();
  const departments=useSelector(state=>state.department.allDepartments)
  const users=useSelector(state=>state.employee.allUsers);
  let salary=0;
  useEffect(()=>{
    dispatch(fetchAllUsers());
    dispatch(fetchAllDepartments());
  },[dispatch]);
  
  
  
  return (
    <>
    <div className='home'>
        <Box className='home-box'>
          <Box margin={2} padding={1}>
            <Typography variant="h6">Employees</Typography>
          </Box>
          <Box margin={2} padding={1}>
            <Typography variant="h6">{users.length}</Typography>
          </Box>
        </Box>


        <Box className='home-box'>
          <Box margin={2} padding={1}>
            <Typography variant="h6">Departments</Typography>
          </Box>
          <Box margin={2} padding={1}>
            <Typography variant="h6">{departments.length}</Typography>
          </Box>
        </Box>        
       
       
    </div>
    <div style={{marginLeft:"4vw"}}>
      <h1>Admins</h1>
      
   <Paper >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Date Of Joining</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell>Salary</TableCell>
          <TableCell>Department</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

    {users && users.map((user) => (
      
    user.is_superuser &&<TableRow key={user.id}>
    <TableCell>{user.firstName +' '+user.lastName}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.gender}</TableCell>
    <TableCell>{user.dateOfJoining}</TableCell>
    <TableCell>{user.address}</TableCell>
    <TableCell>{user.phoneNumber}</TableCell>
    <TableCell>{user.salary}</TableCell>
    <TableCell>{user.department}</TableCell>
    
 
  </TableRow>
))}

      </TableBody>
    </Table>
  </Paper>

    </div>
    </>
  )
}

export default Home
