import axios from "axios";

const BASE_URL = 'http://localhost:1417';


export const fetchallsubcategories = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/getsubcategories`)  
        return response.data.body      
    } catch (error) {
        console.log(error);
    }
}

export const fetchsubcategory = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/getsubcategory/${id}`)
        return response.data.body
    } catch (error) {
        console.log(error);
    }
}

export const updatesubcategory = async(id)=>{
    try {
        const response = await axios.put(`${BASE_URL}/updatesubcategories/${id}`) 
        // return response.data.body       
    } catch (error) {
        console.log(error);
    }
}

export const deletesubcategory = async(id)=>{
    try {
        const response = await axios.delete(`${BASE_URL}/deletesubcategories/${id}`) 
        return response.data.body       
    } catch (error) {
        console.log(error);
    }
}