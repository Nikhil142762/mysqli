import React, { useEffect, useState } from 'react';
import Navbar from '../Includes/Navbar';
import Sidebar from '../Includes/Sidebar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchallcategories } from '../Services/CategoryServices';

function Addsubcategory() {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState({
        name: "",
        categories_id: ""
    });
    const [categories, setcategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    const getcategories = async () => {
        try {
            const categoryList = await fetchallcategories();
            setcategories(categoryList);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setUsers({ ...users, image: file.name });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            
            // Clear image error if any
            setErrors((prevErrors) => {
                const { image, ...restErrors } = prevErrors;
                return restErrors;
            });
        }
    };

    const validateform = () => {
        const newErrors = {};
        if (!users.name) {
            newErrors.name = "Please enter a name";
        }
        if (!imageFile) {
            newErrors.image = "Please select an image";
        }
        if (!users.categories_id) {
            newErrors.category = "Please select a category";
        }
        setErrors(newErrors);
        console.log("Validation errors:", newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    useEffect(() => {
        getcategories();
    }, []);

    const addcategoryy = async () => {
        if (!validateform()) return; 
        const formData = new FormData();
        formData.append("name", users.name);
        formData.append("categories_id", users.categories_id);
        formData.append("image", imageFile);
        try {
            const response = await axios.post('http://localhost:1417/addsubcategories', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data) {
                navigate("/subcategory/list");
            }
        } catch (error) {
            console.log("Error adding category:", error);
        }
    };

    const backbutton = async()=>{
        try {
            navigate("/subcategory/list")            
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
                                                            <input type="text" className="form-control" placeholder="Name" id="name"
                                                                value={users.name} onChange={(e) => { setUsers({ ...users, name: e.target.value });
                                                                    setErrors((prevErrors) => {const { name, ...restErrors } = prevErrors;
                                                                        return restErrors;
                                                                    });
                                                                }}
                                                            />
                                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="image">Image</label>
                                                            <input type="file" className="form-control" onChange={handleImageChange}/>
                                                            {errors.image && <span className="text-danger">{errors.image}</span>}
                                                            <br />
                                                            {previewImage && (
                                                                <img src={previewImage} alt="Selected" style={{ width: '100px', marginTop: '10px' }} />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="subcategory">Category</label>
                                                            <select className="form-control" id="subcategory" value={users.categories_id}
                                                                onChange={(e) => { setUsers({ ...users, categories_id: e.target.value });
                                                                    setErrors((prevErrors) => { const { category, ...restErrors } = prevErrors;
                                                                        return restErrors;
                                                                    });
                                                                }}
                                                            >
                                                                <option value="">Select Category</option>
                                                                {categories.map((subcategory) => (
                                                                    <option key={subcategory.id} value={subcategory.id}>
                                                                        {subcategory.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.category && <span className="text-danger">{errors.category}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 d-flex flex-sm-row flex-column mt-2">
                                                        <button type="button" className="btn btn-primary mb-1 mb-sm-0 me-0 me-sm-1"
                                                            onClick={addcategoryy}>Add</button>
                                                        <button type="button" className="btn btn-outline-secondary mb-1 mb-sm-0 me-0 me-sm-1"
                                                            onClick={backbutton}>Back</button>
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

export default Addsubcategory;
