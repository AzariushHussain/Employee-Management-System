import { createSlice } from '@reduxjs/toolkit';
import userAPI from '../../mocks/employee';

const storedUserInfo =localStorage.getItem("userInfo");


const initialState={
    userDetails:storedUserInfo?JSON.parse(storedUserInfo):null,
    allUsers:[],
    loading:false,
    error:null,
};
    
    const employeeSlice=createSlice({
        name:'employee',
        initialState,
        reducers:{
            loginStart(state)
            {
                state.loading=true;
                state.error=null;
            },
            loginSuccess(state,action)
            {
                state.userDetails=action.payload;
                state.loading=false;
                state.error=null;
                localStorage.setItem("userInfo",JSON.stringify(action.payload));
            },
            loginFailure(state,action)
            {
                state.loading=false;
                state.error=action.payload
            },
            getUsersStart(state)
            {
                state.loading=true;
                state.error=null;
            },
            getUsersSuccess(state,action)
            {
                state.allUsers=action.payload;
                state.loading=false;
                state.error=null;
            },
            getUsersFailure(state,action)
            {
                state.loading=false;
                state.error=action.payload
            },
            getUserDetailsStart(state)
            {
                state.loading=true;
                state.error=null;
            },
            getUserDetailsSuccess(state,action)
            {
                state.userDetails=action.payload;
                state.loading=false;
                state.error=null;
            },
            getUserDetailsFailure(state,action)
            {
                state.loading=false;
                state.error=action.payload;
            },
            createUserStart(state)
            {
                state.loading=true;
                state.error=null;
            },
            createUserSuccess(state,action)
            {
                state.allUsers=[...state.allUsers,action.payload];
                state.loading=false;
                state.error=null;
            },
            createUserFailure(state,action)
            {
                state.loading=false;
                state.error=action.payload;
            },
            updateUserStart(state)
            {
                state.loading=true;
                state.error=null;
            },
            updateUserSuccess(state,action)
            {
                state.allUsers=state.allUsers.map(item => (item.id === action.payload.id ? action.payload : item))
                // const updatedArray = originalData.map(item => (item.id === updatedData.id ? updatedData : item));

                state.loading=false;
                state.error=null;
            },
            updateUserFailure(state,action)
            {
                state.loading=false;
                state.error=action.payload;
            },
            deleteUserStart(state)
            {
                state.loading=true;
                state.error=null;
            },
            deleteUserSuccess(state,action)
            {
                state.allUsers = state.allUsers.filter(item => item.id !== action.payload.id);
                state.loading=false;
                state.error=null;
            },
            deleteUserFailure(state,action)
            {
                state.loading=false;
                state.error=action.payload;
            },
            logoutSuccess(state)
            {
                state.userDetails=null;
                state.loading=false;
                state.error=null;
                localStorage.removeItem("userInfo"); 
            },

        }
    });

export const{
    loginStart,
    loginSuccess,
    loginFailure,
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    getUserDetailsStart,
    getUserDetailsSuccess,
    getUserDetailsFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    logoutSuccess
}=employeeSlice.actions;



export const login=(email,password)=>async (dispatch)=>{
    try{
        dispatch(loginStart());
        const user=await userAPI.login(email,password);
        dispatch(loginSuccess(user));
    }
    catch(error){
        dispatch(loginFailure(error.message));
    }
};


export const fetchAllUsers=()=>async (dispatch)=>{
    try {
        dispatch(getUsersStart());
        const users= await userAPI.getAllUsers();
        dispatch(getUsersSuccess(users));
    } catch (error) {
        dispatch(getUsersFailure(error.message));
    }
};

export const fetchUserDetails=(userId)=> async (dispatch)=>{
    try {
        dispatch(getUserDetailsStart());
        const userDetails=await userAPI.getUserDetails(userId);
        dispatch(getUserDetailsSuccess(userDetails));
    }
    catch(error){
        dispatch(getUserDetailsFailure(error.message));
    }
};

export const fetchMyDetails=()=>async(dispatch)=>{
    try{
        dispatch(getUserDetailsStart());
        const myDetails=await userAPI.getMyDetails();
        dispatch(getUserDetailsSuccess(myDetails));
    }
    catch(error)
    {
        dispatch(getUserDetailsFailure(error.message))
    }
}

export const createUser=({firstName,lastName,gender,email,address,phoneNumber,salary,password,department})=>async (dispatch)=>{
    try{
        dispatch(createUserStart());
        const user = await userAPI.createUser({firstName,lastName,gender,email,address,phoneNumber,salary,password,department});
        dispatch(createUserSuccess(user));
    }
    catch(error)
    {
        dispatch(createUserFailure(error.message));
    }
    
}

export const updateUser=(userId,updateData)=>async (dispatch) =>{
    try{
        dispatch(updateUserStart());
        const updatedUser=await userAPI.updateUser(userId,updateData);
        dispatch(updateUserSuccess(updatedUser));
    }
    catch(error)
    {
        dispatch(updateUserFailure(error.message));
    }
}

export const deleteUser=(userId)=> async (dispatch)=>{
    try{
        dispatch(deleteUserStart());
        const deletedUser=await userAPI.deleteUser(userId);
        dispatch(deleteUserSuccess(deletedUser.data));
    }
    catch(error)
    {
        dispatch(deleteUserFailure(error.message));
    }
}

export const logout=()=>(dispatch)=>{
    dispatch(employeeSlice.actions.logoutSuccess());//can also write dispatch(logoutSuccess()); it's same
}

export const { reducer } =employeeSlice;

export default employeeSlice;