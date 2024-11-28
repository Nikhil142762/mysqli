import axios from 'axios';
import React, { useState } from 'react';

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setpassword] = useState('');
    const [address, setaddress] = useState('');
    const [image, setImage] = useState(null);  // Set initial image state to null

    const handleChangeImage = (e) => {
        setImage(e.target.files[0]);  // Grab the first selected file
    };

    const response = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('address', address);
        formData.append('image', image);  // Append the file to FormData

        try {
            const res = await axios.post("http://localhost:1417/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res);
            // navigate("/user");  // Uncomment this if you want to navigate
        } catch (err) {
            console.log(err, "error");
        }
    };

    return (
        <div className="app-content content">
            <div className="content-overlay"></div>
            <div className="header-navbar-shadow"></div>
            <div className="content-wrapper container-xxl p-0">
                <div className="content-header row">
                    <div className="content-header-left">
                        <div className="row breadcrumbs-top">
                            <section id="basic-horizontal-layouts">
                                <div className="row">
                                    <div className="col-md-5 col-10 w-50">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title">Add User Form</h4>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={response}>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="mb-1 row">
                                                                <div className="col-sm-3 w-10">
                                                                    <label className="col-form-label" htmlFor="name">
                                                                        First Name
                                                                    </label>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        onChange={(e) => setName(e.target.value)} 
                                                                        value={name}
                                                                        type="text"
                                                                        id="name"
                                                                        className="form-control"
                                                                        placeholder="First Name"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <div className="mb-1 row">
                                                                <div className="col-sm-3">
                                                                    <label className="col-form-label" htmlFor="email">
                                                                        Email
                                                                    </label>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        onChange={(e) => setEmail(e.target.value)} 
                                                                        value={email}
                                                                        type="email"
                                                                        id="email"
                                                                        className="form-control"
                                                                        placeholder="Email"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <div className="mb-1 row">
                                                                <div className="col-sm-3">
                                                                    <label className="col-form-label" htmlFor="phone">
                                                                        Phone
                                                                    </label>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        onChange={(e) => setPhone(e.target.value)} 
                                                                        value={phone}
                                                                        type="text"
                                                                        id="phone"
                                                                        className="form-control"
                                                                        placeholder="Phone"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="mb-1 row">
                                                                <div className="col-sm-3">
                                                                    <label className="col-form-label" htmlFor="phone">
                                                                        Password
                                                                    </label>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        onChange={(e) => setpassword(e.target.value)} 
                                                                        value={password}
                                                                        type="password"
                                                                        id="password"
                                                                        className="form-control"
                                                                        placeholder="password"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="mb-1 row">
                                                                <div className="col-sm-3">
                                                                    <label className="col-form-label" htmlFor="phone">
                                                                        Address
                                                                    </label>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        onChange={(e) => setaddress(e.target.value)} 
                                                                        value={address}
                                                                        type="text"
                                                                        id="password"
                                                                        className="form-control"
                                                                        placeholder="address"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12">
                                                            <div className="mb-1 row">
                                                                <div className="col-sm-3">
                                                                    <label className="col-form-label" htmlFor="file">
                                                                        Image
                                                                    </label>
                                                                </div>
                                                                <div className="col-sm-9">
                                                                    <input 
                                                                        onChange={handleChangeImage} 
                                                                        type="file"
                                                                        id="file"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-9 offset-sm-3">
                                                            <button type="submit" className="btn btn-primary me-1">
                                                                Add User
                                                            </button>
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
            </div>
        </div>
    );
}

export default AddUser;
