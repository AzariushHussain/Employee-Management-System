import './App.css';
//component imports
import Navbar from './components/Navbar';
//Screens import 
import Register from './screens/Register'
import Login from './screens/Login';
import ManageEmployee from './screens/ManageEmployee';

import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Link } from 'react-router-dom';
import Home from './screens/Home';
//icons import 
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useSelector } from 'react-redux';
import PrivateRoute from './utils/PrivateRoute';
import { useEffect } from 'react';

// functions
import { logout } from './redux/slices/employeeSlice';
import { useDispatch } from 'react-redux';
import Department from './screens/Department';

function App() {

  const dispatch=useDispatch()
  const userDetails =useSelector(state=> state.employee.userDetails)
  useEffect(()=>{
  },[userDetails])
  return (

    <div className='App'>
    {userDetails?
    (
    <Router>
      <div className='rightComponent'>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='rightComponentItem' >
            <DashboardIcon/>Dashboard
          </div>
        </Link>

        <Link to="/employee" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='rightComponentItem'>
            <GroupIcon/>Manage Employees
          </div>
        </Link>

        <Link to="/employee/register" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='rightComponentItem'>
            <PersonAddIcon/>Add Employees
          </div>
        </Link>
        <Link to="/employee/department/" style={{ textDecoration: 'none', color: 'inherit' }} >
        <div className='rightComponentItem'>
          <CategoryIcon/>Departments
        </div>
        </Link>
     
        <div className='rightComponentItem' onClick={()=>dispatch(logout())}>
          <LogoutIcon/>Logout
        </div>
      </div>
      <div className="leftComponent" style={{width:"82%",}}>
      
      <Navbar/>
      <Routes>
      <Route element={<PrivateRoute/>}>
        <Route path="/" exact Component={Home}/>
        <Route path="/employee" Component={ManageEmployee}/>
        <Route key="register" path="/employee/register" Component={Register}/>
        <Route key="update"  path="/employee/update/:id"  Component={Register}/>
        <Route  path="/employee/department/"  Component={Department}/>

      </Route>
        <Route path="/login" exact Component={Login}/>
      </Routes>
      </div>
    </Router>
    ):(
      <Login/>
    )
}
   </div>
  );
}

export default App;
