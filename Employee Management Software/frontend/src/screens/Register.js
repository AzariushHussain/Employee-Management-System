import React from 'react'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../redux/slices/employeeSlice'
import { updateUser } from '../redux/slices/employeeSlice'

import { useState } from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'

import { fetchAllDepartments } from '../redux/slices/departmantSlice'

const Register = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const users=useSelector(state=>state.employee.allUsers);
    const departments=useSelector(state=>state.department.allDepartments)

    
    const { id } = useParams();
    const userId = parseInt(id, 10);

    const user=users.find(user => user.id === userId);

    const [userState, setUserState] = useState({
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      address: '',
      phoneNumber: '',
      salary: '',
      password:' ',
      department:' '
      // Add more fields as needed
    });

  
    useEffect(() => {
      if (user) {
        setUserState({
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          email: user.email,
          address: user.address,
          phoneNumber: user.phoneNumber,
          salary: user.salary,
          department: user.department
          // Add more fields as needed
        });
      } else {
        // Reset the state when user becomes undefined
        setUserState({
          firstName: '',
          lastName: '',
          gender: '',
          email: '',
          address: '',
          phoneNumber: '',
          salary: '',
          department:''
          // Add more fields as needed
        });

      }
    }, [user]);

    
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name,value)
    setUserState({ ...userState, [name]: value });
  };

  useEffect(()=>{
    dispatch(fetchAllDepartments());
  },[dispatch]);

  useEffect(()=>{
    console.log(departments)
  },[user])

    const handleRegister=()=>{
        // const firstName=document.getElementById('firstName').value;
        // const lastName=document.getElementById('lastName').value;
        // const email=document.getElementById('email').value;
        // const address=document.getElementById('address').value;
        // const phoneNumber=document.getElementById('phoneNumber').value;
        // const salary=document.getElementById('salary').value;
        // // const department=document.getElementById('department').value;
        // const password=document.getElementById('password').value;



        // console.log(document.getElementById('firstName').value);
        // console.log(document.getElementById('lastName').value);
        // console.log(document.getElementById('email').value);
        // console.log(gender);
        // console.log(document.getElementById('address').value);
        // console.log(document.getElementById('phoneNumber').value);
        // console.log(document.getElementById('salary').value);
        // console.log(document.getElementById('department').value);
        // console.log(document.getElementById('password').value);



        if (!userState.email || !userState.password) {
            // Handle invalid inputs, e.g., show an error message
            console.error('Please enter both email and password');
            return;
          }
          else{
            dispatch(createUser(userState));
            navigate('/employee'); // Redirect to "/employee" after successful registration

          }
    }

    const handleUpdate=()=>{
   
      // const department=document.getElementById('department').value;
      dispatch(updateUser(userId,userState));
      navigate('/employee'); // Redirect to "/employee" after successful registration

    }
    const key = user ? userId : 'new';

  return (
   
      <div className='register-form' key={id}>
    <div className='input-field'>
        <TextField
        helperText="Please enter first name"
        name="firstName"
        label="First Name"
        className='input-field'
        style={{width:"40vw"}}
        value={userState.firstName}
        onChange={handleChange}

        />
    </div>

    <div className='input-field'>
        <TextField
        helperText="Please enter last name"
        name="lastName"
        label="Last Name"
        className='input-field'
        style={{width:"40vw"}}
        value={userState.lastName}
        onChange={handleChange}


        />
    </div>
    <div style={{ display: 'flex', alignItems: 'center' ,justifyContent:'center'}}>
  <FormControl>
    <FormLabel style={{marginRight:'5vw'}}>Gender</FormLabel>
  </FormControl>
  <FormControl>
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
      id="gender" 
      value={userState.gender}
      onChange={handleChange}

    >
      <FormControlLabel name="gender" value="F" control={<Radio />} label="Female" />
      <FormControlLabel name="gender" value="M" control={<Radio />} label="Male" />
    </RadioGroup>
  </FormControl>
</div>

    <div className='input-field'>
        <TextField
        helperText="Please enter email"
        name="email"
        label="Email"
        className='input-field'
        style={{width:"40vw"}}
        value={userState.email}
        onChange={handleChange}


        />
    </div>
    <div className='input-field'>
        <TextField
        helperText="Please enter address"
        name="address"
        label="Address"
        className='input-field'
        style={{width:"40vw"}}
        value={userState.address}
        onChange={handleChange}


        />
    </div>

    <div className='input-field'>
        <TextField
        helperText="Please enter phone number"
        name="phoneNumber"
        label="Phone number"
        className='input-field'
        style={{width:"40vw"}}
        value={userState.phoneNumber}
        onChange={handleChange}
        type="number"  

        />
    </div>

    <div className='input-field'>
        <TextField
        helperText="Please enter Salary"
        name="salary"
        label="Salary"
        className='input-field'
        style={{width:"40vw"}}
        value={userState.salary}
        onChange={handleChange}
        type="number"  

        />
    </div>
<div style={{ display: 'flex', alignItems: 'center' ,justifyContent:'center'}}>
    <FormControl>
    <FormLabel style={{marginRight:'5vw'}}>Department</FormLabel>
  </FormControl>
  <FormControl>
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
      id="department" 
      value={userState.department}
      onChange={handleChange}

    >
      {departments.map(department=><FormControlLabel name="department" value={department.name} control={<Radio />} label={department.name}/>)}
      
      
    </RadioGroup>
  </FormControl>
</div>

      {user?(
      <div className="input-field"  style={{marginTop:"3vh"}}>
          <Button variant='contained' onClick={handleUpdate}>Update</Button>
        </div>
        ):(
          <>
          <div className='input-field'>
          <TextField
          helperText="Please enter Salary"
          name="password"
          label="Password"
          className='input-field'
          style={{width:"40vw"}}
          onChange={handleChange}
          />
          </div>
        <div className="input-field"  style={{marginTop:"3vh"}}>
          <Button variant='contained' onClick={handleRegister}>Submit</Button>
        </div>
        </>)
        }
        

</div>
  )  
}

export default Register
