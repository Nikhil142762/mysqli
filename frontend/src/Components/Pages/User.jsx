import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function User() {
  // e.preventDefault();

  // const findAllUsers = async(req, res)=>{
  //   const result = await axios.get("http://localhost:1417/readAll")
  //   console.log(result);
  //   console.log(res);
    
  // }
  // useEffect(() => {
  //   findAllUsers()
  // },[]);




  const [data, setData] = useState()

  // const navigate = useNavigate()
  const getData = (req, res) => {
    // console.log(data);
    
      try {
         axios.get("http://localhost:1417/readAll")
          .then((res) => {
              // setData(res.data.body)
              const result =  res.data.message[1];
              // res.send(data)
              console.log(result.name);
          }).catch((err) => {
              console.log(err, "err");
          })
      } catch (error) {
          console.log(error, "error");
      }
  }
  // console.log(result);
  
  useEffect(() => {
      getData()
  }, [])


  return (
    <>
      <div class="card mt-4 ms-4" style={{width: "18rem"}}>
  <img src="" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{name}</li>
    <li class="list-group-item">{}</li>
    <li class="list-group-item">{}</li>
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
    </>
  )
}

export default User
