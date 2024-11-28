import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from "../../Includes/Navbar"
import Sidebar from '../../Includes/Sidebar'
import { addNewUser } from '../../Services/UserServices'

function Adduser() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setuser] = useState({
        name: "",
        email: "",
        phone: "",
        password:"",
        address: "",
        image:""
    })
    const addNewuser = async(e)=>{
        try {
            e.preventDefault()
            const result = await addNewUser()
            setuser(result)
            console.log(user);
            
        } catch (error) {
            console.log(error);
        }
    }

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
                                            <form className="form-validate" onClick={addNewuser}>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Name</label>
                                                            <input type="text" required className="form-control" onChange={(e) =>setuser ({ name: e.target.value })} name="name" id="name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="email">E-mail</label>
                                                            <input type="email" className="form-control"  onChange={(e) => setuser ({email: e.target.value })} placeholder="Email" name="email" id="email" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="email">Phone</label>
                                                            <input type="number" className="form-control" onChange={(e) =>setuser({ phone: e.target.value })}  placeholder="phone" name="phone" id="phone" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="email">Password</label>
                                                            <input type="password" className="form-control" onChange={(e) =>setuser({ password: e.target.value })}  placeholder="password" name="password" id="password" />
                                                        </div>
                                                    </div>
                                                   
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="company">Address</label>
                                                            <input type="text" className="form-control" onChange={(e) =>setuser({ address: e.target.value })}   placeholder="Address" id="Address" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 d-flex flex-sm-row flex-column mt-2">
                                                        <button type="submit" className="btn btn-primary mb-1 mb-sm-0 me-0 me-sm-1"  >Save Changes</button>
                                                        <button type="reset" className="btn btn-outline-secondary">Reset</button>
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

export default Adduser
