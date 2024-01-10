import { createSlice } from "@reduxjs/toolkit";
import departmentAPI from "../../mocks/department";

const initialState={
        allDepartments:[],
        loading:false,
        error:null
}

const departmentSlice=createSlice({
    name:'department',
    initialState,
    reducers:{
        getDepartmentStart(state)
        {
            state.loading=true;
            state.error=null;
        },
        getDepartmentSuccess(state,action)
        {
            state.allDepartments=action.payload;
            state.loading=false;
            state.error=null;
        },
        getDepartmentFailure(state,action)
        {
            state.loading=false;
            state.error=action.payload
        },
        createDepartmentStart(state)
        {
            state.loading=true;
            state.error=null;
        },
        createDepartmentSuccess(state,action)
        {
            state.allDepartments=[...state.allDepartments,action.payload];
            state.loading=false;
            state.error=null;
        },
        createDepartmentFailure(state,action)
        {
            state.loading=false;
            state.error=action.payload;
        },
        deleteDepartmentStart(state)
        {
            state.loading=true;
            state.error=null;
        },
        deleteDepartmentSuccess(state,action)
        {
            state.allDepartments = state.allDepartments.filter(item => item.id !== action.payload.id);
            state.loading=false;
            state.error=null;
        },
        deleteDepartmentFailure(state,action)
        {
            state.loading=false;
            state.error=action.payload;
        },
        updateDepartmentStart(state)
        {
            state.loading=true;
            state.error=null;
        },
        updateDepartmentSuccess(state,action)
        {
            console.log(action.payload)
            state.allDepartments=state.allDepartments.map(item => (item.id === action.payload.id ? action.payload : item))
            // const updatedArray = originalData.map(item => (item.id === updatedData.id ? updatedData : item));

            state.loading=false;
            state.error=null;
        },
        updateDepartmentFailure(state,action)
        {
            state.loading=false;
            state.error=action.payload;
        },
    }
});

export const{
    getDepartmentStart,
    getDepartmentSuccess,
    getDepartmentFailure,
    createDepartmentStart,
    createDepartmentSuccess,
    createDepartmentFailure,
    deleteDepartmentStart,
    deleteDepartmentSuccess,
    deleteDepartmentFailure,
    updateDepartmentStart,
    updateDepartmentSuccess,
    updateDepartmentFailure
}=departmentSlice.actions;


export const fetchAllDepartments=()=> async (dispatch)=>{
    try {
        dispatch(getDepartmentStart);
        const departments= await departmentAPI.getAllDepartments();
        dispatch(getDepartmentSuccess(departments));
    } catch (error) {
        dispatch(getDepartmentFailure(error.message));
    }
}

export const createDepartment=(name)=> async (dispatch)=>{
    try {
        dispatch(createDepartmentStart());
        const department=await departmentAPI.createDepartment(name);
        dispatch(createDepartmentSuccess(department));
    } catch (error) {
        dispatch(createDepartmentFailure(error.message))
    }
}

export const deleteDepartment=(departmentId)=>async(dispatch)=>{
    try {
        dispatch(deleteDepartmentStart());
        const deletedDepartment=await departmentAPI.deleteDepartment(departmentId);
        dispatch(deleteDepartmentSuccess(deletedDepartment.data));
    } catch (error) {
        dispatch(deleteDepartmentFailure(error.message));
    }
}

export const updateDepartment=(departmentId,updateData)=>async (dispatch)=>{
    try {
        dispatch(updateDepartmentStart());
        const updatedDetartment= await departmentAPI.updateDepartment(departmentId,updateData);
        dispatch(updateDepartmentSuccess(updatedDetartment));
    } catch (error) {
        dispatch(updateDepartmentFailure(error.message));
    }
}

export const {reducer} =departmentSlice;

export default departmentSlice;