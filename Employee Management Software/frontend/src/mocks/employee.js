import axios from 'axios';

class UserAPI{
    async getUserDetails(userId)
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).token;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const {data} =await axios.get(`http://127.0.0.1:8000/employee/users/${userId}`,config);
            return data
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

    async getAllUsers()
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).access;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const {data} =await axios.get(`http://127.0.0.1:8000/employee/`,config);
            return data;
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

    async createUser({firstName,lastName,gender,email,address,phoneNumber,salary,password,department})
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).access;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const {data}=await axios.post(`http://127.0.0.1:8000/employee/register/`,{firstName,lastName,gender,email,address,phoneNumber,salary,password,department},config);
            return data;
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

    async updateUser(userId,updateData)
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).access;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const {data} = await axios.put(`http://127.0.0.1:8000/employee/profile/update/${userId}/`,updateData,config);
            return data;
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

    async deleteUser(userId)
    {
        try{
            const token=JSON.parse(localStorage.getItem("userInfo")).access;
            const config={
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            };
            const data=await axios.delete(`http://127.0.0.1:8000/employee/delete/${userId}/`,config);
            return data;
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }

    async login(email,password)
    {
        try{
            const {data}=await axios.post(`http://127.0.0.1:8000/employee/token/`,{email:email,password:password});
            return data;
        }
        catch(error)
        {
            throw error.response && error.response.data.detail?error.response.data.detail:error.message;
        }
    }
}

const userAPI=new UserAPI();


export default userAPI;