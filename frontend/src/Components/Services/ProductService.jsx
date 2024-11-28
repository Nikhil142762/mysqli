import axios from 'axios';

const BASE_URL = 'http://localhost:1417';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getproducts`);
        return response.data.body; 
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error; 
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getallcategories/`);
        return response.data.body; 
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; 
    }
};

export const fetchcategory = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/getcategories/${id}`)   
        return response.data.body  
    } catch (error) {
        console.log(error);
    }
}

export const fetchProduct = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/getproduct/${id}`)  
        return response.data.body
    } catch (error) {
        console.log(error);
    }
}


export const updateproduct = async(id)=>{
    try {
        const response = await axios.put(`${BASE_URL}/updateproduct/${id}`)
        return response.data.body        
    } catch (error) {
        console.log(error);
    }
}

export const deleteproduct = async(id)=>{
    try {
        const response = await axios.delete(`${BASE_URL}/deleteproduct/${id}`)    
        return response    
    } catch (error) {
        console.log(error);
    }
}



export const getspecifications = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/readallspecs`)  
        return response.data.body    
    } catch (error) {
        console.log(error);
    }
}


export const getSpecsByid = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/readspecs/${id}`) 
        return response.data.body  
    } catch (error) {
        console.log(error);
    }
}