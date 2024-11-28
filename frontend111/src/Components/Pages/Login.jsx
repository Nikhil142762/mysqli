import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Login() {
  const [data, setdata] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const getdata = async()=>{
    try {
      const result = await axios.get("http://localhost:1417/readAll",{
        email, password
      })
      // console.log(email,password);
      setdata(result.data)
      if(email===result.data.message[1].email){
        console.log("asd");
      }else{
        console.log("err");
        
      }
    }
    
    catch (error) {
      console.log(error);
      
    }
  // console.log(data);
  }
  useEffect(()=>{
    getdata()
  },[])


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    getdata(); // Call getdata when the form is submitted
  };

  return (
    <>
        <div className="container  mt-4">

  <div className="mb-3 mt-4">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={(e)=>{setEmail(e.target.value)}} value={email} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 mt-4">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" value={password} id="exampleInputPassword1"/>
  </div>
  <button type="submit" onSubmit={handleSubmit} className="btn btn-primary ms-4 mt-4">Submit</button>
  </div>

    </>
  )
}

export default Login
