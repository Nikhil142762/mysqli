import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';

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
  // const history = useHistory();

//   const goBack = () => {
//     // Navigate back one step in history
//     history.goBack();
// };

  const [data, setData] = useState()

  const getData = (req, res) => {
      try {
         axios.get("http://localhost:1417/readAll")
          .then((res) => {
            const result =  res.data.message[1];
            setData(result)
              console.log(result)
              // console.log(result.email);
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
      <div className="card mt-4 ms-4" style={{width: "18rem"}}>
  <img src="" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">{}</li>
    <li className="list-group-item">{}</li>
    <li className="list-group-item">{}</li>
  </ul>
  <div className="card-body">
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div>
</div>
    </>
  )
}

export default User
