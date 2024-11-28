
import React, { useEffect, useRef, useState } from 'react'
import { json, Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { deleteCategory, fetchsubcategory } from "./Components/Services/CategoryServices"
import { fetchCategories } from "./Components/Services/ProductService"
import { Plus, Trash2, Eye, Edit} from "react-feather";
import Navbar from './Components/Includes/Navbar'
import Sidebar from './Components/Includes/Sidebar'
function Modal() {
    


  const { id } = useParams()
  const [users, setUsers] = useState("")
  const navigate = useNavigate()
  const hasFetched = useRef(false); 
  

  const getcategories = async () => {
    try {
      const result = await fetchCategories()
      setUsers(result)
    } catch (error) {
      console.log("error ", error);
    }
  }

  const getsubcategories = async () => {
    try {

      const data = await fetchsubcategory()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!hasFetched.current){
      getcategories()
      getsubcategories()
      hasFetched.current=true

    }
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      getcategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };



    const [modal, setismodal] = useState(false)
    const [isdelete , setisdelete] = useState(false)
    const [iscancled , setiscancled] = useState(false)
    
    const modalShow = async()=>{
        try {
           setismodal(true) 
           setisdelete(false)
           iscancled(false)
        } catch (error) {
            console.log(error);
        }
    }

    const isDelete = async()=>{
        try {
            setisdelete(true)    
            setismodal(false)        
        } catch (error) {
            console.log(error);
        }
    }

    const isNotDelete = async()=>{
      try {
        setiscancled(true)
        setismodal(false)        
        setisdelete(false)    
      } catch (error) {
        console.log(error);
        
      }
    }

    const deleted = async()=>{
      try {
        setiscancled(false)
        setismodal(false)        
        setisdelete(false)   
      } catch (error) {
        console.log(error);
      }
    }
    const cancled = async()=>{
      try {
        setiscancled(false)
        setismodal(false)        
        setisdelete(false)   
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <>

    {modal==true ? 
      <div style={modalOverlayStyle}>
      <div style={modalContainerStyle}>
        {/* <h2 style={{ textAlign: 'center' }}>Modal</h2> */}
        <div style={{ textAlign: 'center', padding: '5px' }}>
          <img src="../images/exclamation.gif" alt="" width={70} height={70}/><br></br><br></br>
          <h2>Are You Sure </h2>
          <h6>You won't be able to revert this!</h6>
          <div>
            <button onClick={isDelete}  style={buttonStyle_del}>Delete</button> &nbsp;
            <button onClick={isNotDelete} style={buttonStyle_can}>Cancel</button>
          </div>
        </div>
      </div>
    </div>: ""}

{isdelete==true ? 
<div style={modalOverlayStyle}>
      <div style={modalContainerStyle}>
        {/* <h2 style={{ textAlign: 'center' }}>Modal</h2> */}
        <div style={{ textAlign: 'center', padding: '5px' }}>
          <h2>Deleted</h2>
          <img src="../images/tick.gif" alt="" />
          <p>Your data is deleted !</p>
          <div>
            <button onClick={deleted}  style={buttonStyle_can}>OK</button>
          </div>
        </div>
      </div>
    </div>: ""}


    {iscancled==true ? 
<div style={modalOverlayStyle}>
      <div style={modalContainerStyle}>
        {/* <h2 style={{ textAlign: 'center' }}>Modal</h2> */}
        <div style={{ textAlign: 'center', padding: '5px' }}>
          <img src="../images/cross.gif" alt="" width={70} height={70} /><br></br>
          <div className='text'>
          <h2>Cancled</h2>
          <p>Your data is safe !</p>
          </div>
          <div>
            <button onClick={cancled}  style={buttonStyle_can}>OK</button>
          </div>
        </div>
      </div>
    </div>: ""}


    <Navbar />
      <Sidebar />
      <div className="app-content content ">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row"></div>
          <ul className="nav nav-pills" role="tablist" style={{ display: "flex", alignItems: " center", justifyContent: " end" }}>
            <li className="nav-item">
              <Link to={`/categories/add`} className="nav-link d-flex align-items-center active" id="account-tab" data-bs-toggle="tab" aria-controls="account" role="tab" aria-selected="true">
              <Plus/>   <span className="d-none d-sm-block">  Add Category</span>
              </Link>
            </li>
          </ul>
          <div className="content-body">
            <section className="app-user-list">
              <div className="card">
                <div className="card-datatable table-responsive pt-0">
                  <table className="user-list-table table">
                    <thead className="table-light">
                      <tr>
                      
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user, index) => (
                          <tr key={user.id}>
                           <td>
                              <button className="btn btn-sm btn-danger ms-1" onClick={() => modalShow(user.id)}  ><Trash2 width={15}/></button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
               

              </div>

            </section>

          </div>
        </div>
      </div>




  </>
  );
}
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContainerStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  width: '450px',
  textAlign: 'center',
};

const buttonStyle_can = {
  padding: '8px 16px',
  margin: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: 'green',
  color: '#fff',
};
const buttonStyle_del = {
  padding: '8px 16px',
  margin: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: 'red',
  color: '#fff',
};

export default Modal;




