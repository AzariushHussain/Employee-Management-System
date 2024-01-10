import { reducer as employeeReducer } from "../slices/employeeSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { reducer as departmentReducer } from "../slices/departmantSlice";

export const rootReducer=combineReducers({
    employee:employeeReducer,
    department:departmentReducer
})