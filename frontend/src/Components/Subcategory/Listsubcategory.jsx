import React, { useEffect, useState } from 'react'
import { fetchallsubcategories, fetchsubcategory, updatesubcategory } from '../Services/SubcategoryServices'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar  from '../Includes/Navbar'
import Sidebar  from '../Includes/Sidebar'
import axios from 'axios'
import { fetchallcategories, fetchcategory } from '../Services/CategoryServices'

function Listsubcategory() {

    const {id} = useParams()
    const [category, setCategory] = useState({name:""})
    const [users, setUsers] = useState({
        name:"",
        image:"",
        category_id:""
    })
    const navigate = useNavigate()

    const getsubcategory = async()=>{
        try {
            const data = await fetchsubcategory(id)
            setUsers(data)         
            if(data.categories_id) {
                getcategory(data.categories_id)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getcategory = async (categoryId) => {
        try {
            const data = await fetchcategory(categoryId)
            setCategory(data)
        } catch (error) {
            console.log(error)
        }
    }

    const backbutton = async()=>{
        try {
            navigate("/subcategory/list")
        } catch (error) {
           console.log(error);
        }
    }

    useEffect(()=>{
        getsubcategory()
    },[])

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
                                                        <input  className="form-control" placeholder="Name" value={users?.name} readOnly id="name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="mb-1">
                                                        <label className="form-label" htmlFor="name">Category Name</label>
                                                        <input  className="form-control" placeholder="Name" value={category?.name} readOnly id="name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-1">
                                                        <label className="form-label" htmlFor="name">Image</label><br></br>
                                                        <img  className='rounded' placeholder="Name" src={`http://localhost:1417/images/users/${users.image}`} width={120} height={100} name="" readOnly id="name" />
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

export default Listsubcategory
