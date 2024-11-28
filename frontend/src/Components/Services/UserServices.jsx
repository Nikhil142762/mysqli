import axios from "axios";

const BASE_URL = 'http://localhost:1417';


export const fetchUser = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/read/${id}`)
        return response.data.body
    } catch (error) {
        console.log(error);
    }
}

export const fetchallusers = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/readall`)
        return response.data.body
    } catch (error) {
        console.log(error);
    }

}

export const updateuser = async(id)=>{
    try {
        const response = await axios.put(`${BASE_URL}/update/${id}`)    
        return response.data.body    
    } catch (error) {
        console.log(error);
    }
}

export const deleteuser = async()=>{
    try {
        const response = await axios.delete(`${BASE_URL}/delete/${id}`) 
        return response.data.body
    } catch (error) {
        console.log(error);
        
    }
}


export const addNewUser = async()=>{
    try {
         const response = await axios.post(`${BASE_URL}/create`)  
        //  return response.data.body      
    } catch (error) {
        console.log(error);
    }
}

export const loginuser = async()=>{
    try {
        const response  = await axios.post(`${BASE_URL}/login`)        
    } catch (error) {
        console.log(error);
    }
}