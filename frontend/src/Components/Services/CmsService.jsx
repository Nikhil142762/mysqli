import axios from "axios";

const BASE_URL = 'http://localhost:1417';

export const fetchAboutUs = async()=>{
    try {
        const data = await axios.get(`${BASE_URL}/findabout`)
        return data.data.body
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchPrivacypolicy = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/findprivacy`)    
        return response.data.body    
    } catch (error) {
        console.log(error);
    }
}

export const fetchTerms = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/findterms`)
        return response.data.body
    } catch (error) {
        console.log(error);
    }
}