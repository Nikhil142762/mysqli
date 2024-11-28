import React, { useEffect, useState } from 'react'
import Navbar from '../../Includes/Navbar'
import Sidebar from '../../Includes/Sidebar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUser } from '../../Services/UserServices'

function Edit() {
    const { id } = useParams()

    const navigate = useNavigate()
    const [user, setuser] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })

    useEffect(() => {
        const getData = async () => {
            const result = await fetchUser(id)
            setuser(result)
            // console.log(result);
        }
        getData()
    }, [])
    
    const editUser = async (e) => {
        e.preventDefault(); 
        try {
            const result = await axios.put(`http://localhost:1417/update/${id}`, user);
            console.log('User updated:', result );
            if(result){
                navigate('/users/list');
            }
        } catch (error) {
            console.error("Error updating user", error);
        }
    };
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
                                             <form className="form-validate" onSubmit={editUser}>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Name</label>
                                                            <input type="text" className="form-control" placeholder="Name" value={user?.name} onChange={(e) => setuser({ ...user, name: e.target.value })} name="name" id="name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="email">E-mail</label>
                                                            <input type="email" className="form-control" onChange={(e) => setuser({ ...user, email: e.target.value })} value={user?.email} placeholder="Email" name="email" id="email" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="email">Phone</label>
                                                            <input type="number" className="form-control" value={user?.phone} onChange={(e) => setuser({ ...user, phone: e.target.value })} placeholder="phone" name="phone" id="phone" />
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="status">Status</label>
                                                            <select className="form-select" id="status">
                                                                <option>Active</option>
                                                                <option>Blocked</option>
                                                                <option>Deactivated</option>
                                                            </select>
                                                        </div>
                                                    </div> */}
                                                    {/* <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="role">Role</label>
                                                            <select className="form-select" id="role">
                                                                <option>Admin</option>
                                                                <option>User</option>
                                                                <option>Staff</option>
                                                            </select>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="company">Address</label>
                                                            <input type="text" className="form-control" value={user?.address} onChange={(e) => setuser({ ...user, address: e.target.value })} placeholder="Address" id="Address" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 d-flex flex-sm-row flex-column mt-2">
                                                        <button type="submit" className="btn btn-primary mb-1 mb-sm-0 me-0 me-sm-1"  >Save Changes</button>
                                                        {/* <button type="reset" className="btn btn-outline-secondary">Reset</button> */}
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

export default Edit



