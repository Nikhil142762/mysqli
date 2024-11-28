import React, { useEffect, useState } from 'react';
import Navbar from '../Includes/Navbar';
import Sidebar from '../Includes/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Addcategory() {
    const { id } = useParams();
    const [users, setUsers] = useState({
        name: "",
        image: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);  
            setUsers({ ...users, image: file.name });
            setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setUsers({ ...users, name: value });
        if (value) {
            setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!users.name) newErrors.name = "Please enter a name.";
        if (!imageFile) newErrors.image = "Please upload an image.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addcategoryy = async () => {
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("name", users.name);
        formData.append("image", imageFile);

        try {
            const response = await axios.post('http://localhost:1417/addcategories', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data) {
                navigate("/categories/list");
            } else {
                console.log("Please provide valid data.");
            }
        } catch (error) {
            console.log("Error adding category:", error);
        }
    };


    const backbutton = async()=>{
        try {
            navigate("/categories/list")            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="header-navbar-shadow"></div>
                <div className="content-wrapper container-xxl p-0">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        <section className="app-user-edit">
                            <div className="card">
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="account" aria-labelledby="account-tab" role="tabpanel">
                                            <div className="form-validate">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Name</label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Name"
                                                                id="name" 
                                                                value={users.name}
                                                                onChange={handleNameChange}
                                                                required 
                                                            />
                                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="image">Image</label>
                                                            <input 
                                                                type="file" 
                                                                className="form-control"  
                                                                onChange={handleImageChange}
                                                                required 
                                                            />
                                                            {errors.image && <span className="text-danger">{errors.image}</span>}
                                                            <br />
                                                            {previewImage && (
                                                                <img src={previewImage} alt="Selected" style={{ width: '100px', marginTop: '10px' }} />
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-12 d-flex flex-sm-row flex-column mt-2">
                                                        <button type="button" className="btn btn-primary mb-1 mb-sm-0 me-0 me-sm-1" 
                                                            onClick={addcategoryy}>Add </button>
                                                        <button type="button" className="btn btn-primary mb-1 mb-sm-0 me-0 me-sm-1" 
                                                            onClick={backbutton}>Back </button>
                                                    </div>
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

export default Addcategory;
