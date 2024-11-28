import axios from "axios";

const BASE_URL = 'http://localhost:1417';

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/deletetecategories/${id}`);
        return response.data; 
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error; 
    }
};

export  const updateCategory = async (id) => {
    try {
        const response = await axios.put(`${BASE_URL}/updatecategories/${id}`);
        return response.data.body
    } catch (error) {
        console.error("Error updating user", error);
    }
};

export const fetchallcategories = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/getallcategories`)     
        return response.data.body   
    } catch (error) {
        console.log(error);
    }
}

export const fetchcategory = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/getcategories/${id}`)   
        return response.data.body     
    } catch (error) {
        console.log(error);
    }
}

export const fetchsubcategory = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/getsubcategories`)    
        return response.data.body    
    } catch (error) {
        console.log(error);
    }
}

export const updatecategories = async(id)=>{
    try {
        const response = await axios.put(`${BASE_URL}/updatecategories/${id}`)  
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const addcategory = async()=>{
    try {
        const response = await axios.post(`${BASE_URL}/addcategories`)     
        return response.data.body  
    } catch (error) {
        console.log(error);
    }
}