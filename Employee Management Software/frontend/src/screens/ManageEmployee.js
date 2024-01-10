import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { Button, colors } from '@mui/material';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { fetchAllUsers } from '../redux/slices/employeeSlice';

import { useEffect } from 'react';

import { deleteUser } from '../redux/slices/employeeSlice';

import { Link } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageEmployee = () => {
const dispatch=useDispatch();
const users=useSelector(state=>state.employee.allUsers);

const handleDelete=(id)=>
{
   dispatch(deleteUser(id))
   
}



useEffect(()=>{
  dispatch(fetchAllUsers());
},[dispatch]);

  useEffect(()=>{
    console.log(users)
  },[users]);
  
  return (
    <>
    

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
      
    !user.is_superuser &&<TableRow key={user.id}>
    <TableCell>{user.firstName +' '+user.lastName}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.gender}</TableCell>
    <TableCell>{user.dateOfJoining}</TableCell>
    <TableCell>{user.address}</TableCell>
    <TableCell>{user.phoneNumber}</TableCell>
    <TableCell>{user.salary}</TableCell>
    <TableCell>{user.department}</TableCell>
    
    <Link to={`/employee/update/${user.id}`} >
      <EditIcon style={{color:"black"}}/>
    </Link>
    &ensp;
    <DeleteIcon  onClick={() => handleDelete(user.id)}/>
    

  </TableRow>
))}

      </TableBody>
    </Table>
  </Paper>

  </>
);
};
export default ManageEmployee
