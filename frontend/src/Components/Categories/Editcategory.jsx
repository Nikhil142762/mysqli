import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Includes/Navbar';
import Sidebar from '../Includes/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategories } from "../Services/ProductService";
import { fetchallcategories, fetchcategory, updatecategories, updateCategory } from "../Services/CategoryServices";
import { fetchallsubcategories } from "../Services/SubcategoryServices";
import axios from 'axios';

function EditCategory() {
    const { id } = useParams();
    const [users, setUsers] = useState({
        name: "",
        image: "",
        subcategory_id: ""
    });
    
    const hasFetched = useRef(false); 
    const [subcategories, setSubcategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();

    const getCategories = async () => {
        try {
            const result = await fetchcategory(id);
            setUsers(result)
            // console.log(result);
            
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    const getSubcategories = async () => {
        try {
            const subcategoryList = await fetchallsubcategories();
            setSubcategories(subcategoryList);
        } catch (error) {
            console.log("Error fetching subcategories:", error);
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', users.name);
            // formData.append('subcategory_id', users.subcategory_id);
            if (imageFile) {
                formData.append('image', imageFile);
            }
            const result = await axios.put(`http://localhost:1417/updatecategories/${id}`,formData, users);
            // console.log(id,"categroyiddd", formData);
            
            if (result) {
                navigate("/categories/list");
                // console.log('Category updated:', result);
            }
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    useEffect(() => {
        if(!hasFetched.current){
            getCategories();
            getSubcategories();
            hasFetched.current=true
        }
    }, []);

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
                                            <form className="form-validate" onSubmit={handleUpdateCategory}>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Name</label>
                                                            <input type="text" className="form-control" placeholder="Name" value={users.name} id="name" onChange={(e) => setUsers({ ...users, name: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="image">Image</label>
                                                            <input type="file" className="form-control" 
                                                            onChange={handleImageChange}/>
                                                            <br />
                                                            {users.image && (<img src={`http://localhost:1417/images/users/${users?.image}`}
                                                            width={130} className='rounded-circle' height={130} alt="Category" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="subcategory">Subcategory</label>
                                                            <select className="form-control" id="subcategory" value={users.subcategory_id}
                                                                onChange={(e) => setUsers({ ...users, subcategory_id: e.target.value })} >
                                                                <option >Select Subcategory</option>
                                                                {subcategories.map((subcategory) => (
                                                                    <option key={subcategory.id} value={subcategory.id}>
                                                                        {subcategory.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-12 d-flex flex-sm-row flex-column mt-2">
                                                        <button type="submit" className="btn btn-primary mb-1 mb-sm-0 me-0 me-sm-1">
                                                            Update
                                                        </button>
                                                        <button type="reset" className="btn btn-outline-secondary" onClick={backbutton}>
                                                         Back
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
        </>
    );
}

export default EditCategory;
