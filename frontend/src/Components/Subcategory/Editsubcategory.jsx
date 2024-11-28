import React, { useEffect, useState } from 'react'
import Navbar from '../Includes/Navbar'
import Sidebar from '../Includes/Sidebar'
import { fetchsubcategory, updatesubcategory } from '../Services/SubcategoryServices'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchallcategories } from '../Services/CategoryServices'
import axios from 'axios'

function Editsubcategory() {
    const {id} = useParams()
    const [categories, setcategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const [users, setUsers] = useState({
        name:"",
        image:"",
        categories_id:""
    })
    const navigate = useNavigate()

    const getcategory = async()=>{
        try {
            const data = await fetchsubcategory(id)  
            setUsers(data)          
        } catch (error) {
            console.log(error);
        }
    } 

    const getcategories = async () => {
        try {
            const categoryList = await fetchallcategories();
            setcategories(categoryList);
        } catch (error) {
            console.log("Error fetching subcategories:", error);
        }
    };

    useEffect(()=>{
        getcategory()
        getcategories()
    },[])

    const handleUpdateSubcategory = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', users.name);
            formData.append('categories_id', users.categories_id);
            if (imageFile) {
                formData.append('image', imageFile);
            }
            const result = await axios.put(`http://localhost:1417/updatesubcategories/${id}`,formData, users);
            if (result) {
                navigate("/subcategory/list");
            }
        } catch (error) {
            console.error("Error updating subcategory:", error);
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
                                        <form className="form-validate" onSubmit={handleUpdateSubcategory}  >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="mb-1">
                                                        <label className="form-label" htmlFor="name">Name</label>
                                                        <input type="text" className="form-control" placeholder="Name" value={users?.name} id="name" onChange={(e) => setUsers({ ...users, name: e.target.value })} />
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
                                                <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="subcategory">Subcategory</label>
                                                            <select
                                                                className="form-control"
                                                                id="subcategory"
                                                                value={users.categories_id}
                                                                onChange={(e) => setUsers({ ...users, categories_id: e.target.value })}
                                                            >
                                                                <option value="">Select Category</option>
                                                                {categories.map((category) => (
                                                                    <option key={category.id} value={category.id}>
                                                                        {category.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                <div className="col-12 d-flex flex-sm-row flex-column mt-2">
                                                    <button type="submit" className="btn btn-primary mb-1 mb-sm-0 me-0 me-sm-1"  >Update</button>
                                                    <button type="reset" className="btn btn-outline-secondary" onClick={backbutton}>Back</button>
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

export default Editsubcategory
