import axios from "axios";

const BASE_URL = 'http://localhost:1417';


export const handlelogin = async()=>{
   try {
     const data = await axios.post(`${BASE_URL}/login`)

   } catch (error) {
    
   }
}