import React, { useEffect, useRef, useState } from 'react'
import Navbar from "../Includes/Navbar"
import Sidebar from "../Includes/Sidebar"
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { fetchcategory } from '../Services/CategoryServices'
import { fetchsubcategory } from '../Services/SubcategoryServices'

function Categorielist() {

    const {id} = useParams()
    const [subcategory, setsubcategory] = useState({name:""})
    const [category, setcategory] = useState({
        name:"",
        image:"",
        // subcategory_id:""
    })
  const hasFetched = useRef(false); 

    const navigate = useNavigate()

    const getcategories = async()=>{
        try {
            const data = await fetchcategory(id)   
            console.log(data,"category");
            setcategory(data)
        } catch (error) {
            console.log(error);
        }
    }


    const backbutton = async()=>{
        try {
            navigate("/categories/list")
        } catch (error) {
           console.log(error);
        }
    }

    useEffect(() => {
        if(!hasFetched.current){
            getcategories();
            hasFetched.current= true
        }
    }, [id]); 
  
return (
     
    <>   
        <Navbar />
        <Sidebar />
        <div className="app-content content ">
            <div className="content-overlay"></div>
            <div className="header-navbar-shadow"></div>
            <div className="content-wrapper container-xxl p-0">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <section className="app-user-edit">
                        <div className="card">
                            <div className="card-body">
                                <div className="tab-content">
                                    <div className="tab-pane active" id="account" aria-labelledby="account-tab" role="tabpanel">
                                        <form className="form-validate"  >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mb-1">
                                                        <label className="form-label" htmlFor="name">Name</label>
                                                        <input  className="form-control" placeholder="Name" value={category.name} readOnly  id="name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-1">
                                                        <label className="form-label" htmlFor="name">Image</label><br></br>
                                                        <img  className='rounded' placeholder="Name" src={`http://localhost:1417/images/users/${category.image}`} width={120} height={100} name="" id="name" readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex flex-sm-row flex-column mt-2">
                                                    <button type="submit" className="btn btn-primary mb-1 mb-sm-0 me-0 me-sm-1" onClick={backbutton} >Back</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>

    </>
)
}
export default Categorielist
