import React, { useEffect, useState } from 'react';
import Navbar from '../Includes/Navbar';
import Sidebar from '../Includes/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); 
    const [imagePreview, setImagePreview] = useState(''); 

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setName(parsedUser.name);
            setPhone(parsedUser.phone);
            setAddress(parsedUser.address);
            setImagePreview(`http://localhost:1417/images/users/${parsedUser.image || 'default.png'}`);
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('address', address);
        if (selectedImage) {
            formData.append('image', selectedImage); 
        }
        try {
            const response = await axios.post(`http://localhost:1417/updateProfile/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response && response.data) {
                const updatedUser = response.data.body;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Profile update failed:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="app-content content">
                <div className="content-overlay" />
                <div className="header-navbar-shadow" />
                <div className="content-wrapper container-xxl p-0">
                    <div className="content-header row">
                        <div className="content-header-left col-md-9 col-12 mb-2">
                            <div className="row breadcrumbs-top">
                                <div className="col-12">
                                    <h2 className="content-header-title float-start mb-0">Update Profile</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-header row" />
                    <div className="content-body">
                        <section id="page-account-settings">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div role="tabpanel" className="tab-pane active">
                                                    <div className="d-flex">
                                                        <a href="#" className="me-25">
                                                            <img
                                                                className="rounded me-50"
                                                                src={imagePreview}
                                                                alt="avatar"
                                                                height={80}
                                                                width={80}
                                                            />
                                                        </a>
                                                        <div className="mt-75 ms-1">
                                                            <label
                                                                htmlFor="account-upload"
                                                                className="btn btn-sm btn-primary mb-75 me-75">
                                                                Upload
                                                            </label>
                                                            <input
                                                                type="file"
                                                                id="account-upload"
                                                                hidden
                                                                accept="image/*"
                                                                onChange={handleImageUpload}
                                                            />
                                                            <button className="btn btn-sm btn-outline-secondary mb-75"
                                                            onClick={() => setImagePreview(`http://localhost:1417/images/users/${user?.image || 'default.png'}`)} >
                                                                Reset
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <form className="validate-form mt-2" onSubmit={updateProfile}>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="mb-1">
                                                                    <label className="form-label" htmlFor="account-name">Name</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="account-name"
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                        placeholder="Name"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="mb-1">
                                                                    <label className="form-label" htmlFor="account-phone">Phone</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="account-phone"
                                                                        value={phone}
                                                                        onChange={(e) => setPhone(e.target.value)}
                                                                        placeholder="Phone"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="mb-1">
                                                                    <label className="form-label" htmlFor="account-address">Address</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="account-address"
                                                                        value={address}
                                                                        onChange={(e) => setAddress(e.target.value)}
                                                                        placeholder="Address"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <button type="submit" className="btn btn-primary mt-2 me-1">Save changes</button>
                                                                <button type="reset" className="btn btn-outline-secondary mt-2">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
