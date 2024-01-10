import axios from 'axios';

class DepartmentAPI{
    async getDepartmentDetails(deptId)
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).token;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const {data} =await axios.get(`http://127.0.0.1:8000/employee/departments/${deptId}`,config);
            return data
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

    async getAllDepartments()
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).access;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const {data} =await axios.get(`http://127.0.0.1:8000/employee/departments/`,config);
            return data;
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

    async createDepartment(name)
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).access;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const {data}=await axios.post(`http://127.0.0.1:8000/employee/departments/`,{name},config);
            return data;
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

    async updateDepartment(id,name)
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).access;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const {data} = await axios.put(`http://127.0.0.1:8000/employee/departments/${id}/`,{name},config);
            return data;
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

    async deleteDepartment(departmentId)
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).access;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const data=await axios.delete(`http://127.0.0.1:8000/employee/departments/${departmentId}/`,config);
            return data;
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

   
}

const departmentAPI=new DepartmentAPI();


export default departmentAPI;