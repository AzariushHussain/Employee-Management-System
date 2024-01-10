import React, { useEffect,useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import "../App.css"
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch,useSelector } from 'react-redux';

import { fetchAllDepartments } from '../redux/slices/departmantSlice';
import { deleteDepartment } from '../redux/slices/departmantSlice';
import { createDepartment } from '../redux/slices/departmantSlice';
import { updateDepartment } from '../redux/slices/departmantSlice';
const Department = () => {

  const dispatch=useDispatch();
  const departments=useSelector(state=>state.department.allDepartments)
  const [id,setId]=useState(null);
  const [name,setName]=useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };
  
 const  handleCreate=(event)=>{
    if (!document.getElementById('departmentName').value) {
      console.log("Please enter the name of department to be created")
    }
    else
    {
        dispatch(createDepartment(document.getElementById('departmentName').value))
        document.getElementById('departmentName').value="";
    }
  }

  const handleDelete=(id)=>
  {
     dispatch(deleteDepartment(id))
     
  }
  
  const handleEdit=()=>{
    dispatch(updateDepartment(id,name))
    setId(null);
    setName(null)

  }
useEffect(()=>{
  // console.log(departments.find(department=>department.id===id))
  setName(departments.find(department=>department.id===id)?.name)

},[id])

useEffect(()=>{
  dispatch(fetchAllDepartments());
},[dispatch]);

// useEffect(()=>{
//   console.log(departments)
// },[departments])
  return (
    <div key={id}>
    <div className='register-form' style={{display:"flex",}} >
    <div className='input-field'>
        <TextField
        helperText="Enter the department name to add"
        id="departmentName"
        label="Department"
        className='input-field'
        value={name}
        style={{width:"40vw", }}
        onChange={handleChange}
           />
    {id? <Button variant='contained' style={{height:"72%"}} onClick={handleEdit}>Update</Button>:<Button variant='contained' style={{height:"72%"}} onClick={handleCreate}>Submit</Button>}
    
    </div>
    </div>
   
  
    <div style={{width:"90%",display:"flex" ,justifyContent:"center", alignContent:"center", marginLeft:"10px"}}>
    <Paper >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell >Dept. Id.</TableCell>
          <TableCell >Dept. Name</TableCell>
          <TableCell >Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {departments && departments.map((department)=>(
          <TableRow key={department.id}>
          <TableCell>{department.id}</TableCell>
          <TableCell>{department.name}</TableCell>
          <TableCell><EditIcon onClick={()=>{setId(department.id)}}/>&nbsp;<DeleteIcon onClick={()=>handleDelete(department.id)}/></TableCell>
          </TableRow>
        ))} 
      </TableBody>
    </Table>
  </Paper>

    </div>
    </div>
  )
}

export default Department
