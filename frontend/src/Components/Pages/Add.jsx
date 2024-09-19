import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Add() {

    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [phone, setphone] = useState()
    const [address, setaddress] = useState()
    const [imageUrl, setimageUrl] = useState()  
    // const navigate = useNavigate()


    const [data, setData] = useState();


    // const navigate = useNavigate()
    const handlechange = (e) => {
        setData({ ...data, [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value })
    }


    const addProduct = () => {
        e.preventDefault()
        try {
            axios.post("http://localhost:10417/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
                setData(res.data.body)
                navigate("/user")
            }).catch((err) => {
                console.log(err, "error");
            })
        } catch (error) {
            console.log(error, "error");
        }
    }

  return (
    <>
      <div className='mt-4 container'>
  <div className="mb-3 mt-4 container">
    <label for="image" className="form-label">Name</label>
    <input type="text" className="form-control" id="image" onChange={(req)=>setname(req.target.value)} name={name} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 mt-4 container">
    <label for="image" className="form-label">Email</label>
    <input type="email" className="form-control" id="image" onChange={(req)=>setemail(req.target.value)} name={email} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 mt-4 container">
    <label for="image" className="form-label">Password</label>
    <input type="password" className="form-control" id="image" onChange={(req)=>setpassword(req.target.value)} name={password} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 mt-4 container">
    <label for="image" className="form-label">Phone</label>
    <input type="text" className="form-control" id="image" onChange={(req)=>setphone(req.target.value)} name={phone} aria-describedby="emailHelp"/>
  </div>
  
  <div className="mb-3 mt-4 container">
    <label for="image" className="form-label">Address</label>
    <input type="text" className="form-control" id="image" onChange={(req)=>setaddress(req.target.value)} name={address} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 mt-4 container">
    <label for="image" className="form-label">Image</label>
    <input type="file" className="form-control" id="image" onChange={(req)=>setimageUrl(req.target.value)} name={imageUrl} aria-describedby="emailHelp"/>
  </div>
  {/* <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Content</label>
    <textarea rows={8} cols={100} onChange={(req)=>{setcontent(req.target.value)}}></textarea>
  </div> */}
 
  <button className="btn btn-primary" onSubmit={addProduct} onChange={handlechange}  >Submit</button>
</div>
    </>
  )
}

export default Add
