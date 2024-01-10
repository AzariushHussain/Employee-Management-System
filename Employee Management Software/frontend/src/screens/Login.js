import { Button } from '@mui/material';
import React from 'react';
import TextField from '@mui/material/TextField';
import '../App.css';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/employeeSlice';

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Access the values directly from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate inputs if needed
    if (!email || !password) {
      // Handle invalid inputs, e.g., show an error message
      console.error('Please enter both email and password');
      return;
    }

    // Dispatch the login action with email and password
    dispatch(login(email, password));
  };

  return (
    <div style={{ position: 'fixed', width: '100%', marginTop: '15vh' }}>
      <div className='input-field'>
        <TextField
          helperText='Please enter your Email'
          id='email'
          label='Email'
          className='input-field'
          style={{ width: '40vw' }}
        />
      </div>
      <div className='input-field'>
        <TextField
          helperText='Please enter your Password'
          id='password'
          label='Password'
          className='input-field'
          style={{ width: '40vw' }}
          type='password'
        />
      </div>

      <div className='input-field'>
        <Button variant='contained' onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
