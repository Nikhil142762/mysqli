import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchallcategories } from '../Services/CategoryServices';
import Navbar from "../Includes/Navbar"
import Sidebar from '../Includes/Sidebar';
import { fetchallsubcategories } from '../Services/SubcategoryServices';
import axios from 'axios';
import { getspecifications, getSpecsByid } from '../Services/ProductService';
import { Plus } from 'react-feather';

function Addproduct() {

    const { id } = useParams();
    const [users, setUsers] = useState({
        product_name: "",
        product_price:"",
        product_details:"",
        product_size:"",
        category_id: "",
        product_quantity:""
    });
    const [additionalSpecs, setAdditionalSpecs] = useState([]);
    const [categories, setcategories] = useState([]);
    const[specifications, setspecifications] = useState([])
    const hasFetched = useRef(false); 
    
    const [specs, setspecs] = useState([])
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    
    const getcategories = async () => {
        try {
            const categoryList = await fetchallcategories();
            setcategories(categoryList);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    }
    
    const getspecs = async()=>{
        try {
            const data = await getspecifications()
            setspecs(data)
            console.log(data,";;;;;;;;");
            
        } catch (error) {
            console.log(error);
        }
    }
    
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
    
    useEffect(() => {
        if(!hasFetched.current){
            getcategories();
            getspecs()
            hasFetched.current=true
            // getspecsbyId()
        }
    }, []);
    
    const validateForm = () => {
        const newErrors = {};
        if (!users.product_name) {
            newErrors.product_name = "Please enter a name";
        }
        if (!users.product_details) {
            newErrors.product_details = "Please add details of product ";
        }
        if(!users.category_id){
            newErrors.category_id = "Please select a category ";
        }
        if(!users.product_price){
            newErrors.product_price= " Please select specifications of the product"
        }
        if(!users.product_size){
            newErrors.product_size= " Please select specifications of the product"
        }
        if(!users.product_quantity){
            newErrors.product_quantity= " Please select specifications of the product"
        }
        if(!imageFile){
            newErrors.image = "Please upload a image"
        }
        setErrors(newErrors);
        console.log("Validation errors:", newErrors);
        return Object.keys(newErrors).length === 0; 
    };
    
    const handleNameChange = (e) => {
        const name = e.target.value;
        setUsers({ ...users, product_name: name });
        if (name) {
            setErrors((prevErrors) => ({ ...prevErrors, product_name: "" }));
        }
    };
    
    const handleproductQuantity = (e)=>{
        const quantity = e.target.value
        setUsers({...users,product_quantity:quantity})
        if(quantity){
            setErrors((prevErrors)=>({...prevErrors,product_quantity:""}))
        }
    }
    const handlepriceChange = (e)=>{
        const price = e.target.value
        setUsers({...users,product_price:price})
        if(price){
            setErrors((prevErrors)=>({...prevErrors,product_price:""}))
        }
    }
    
    const handledetailsChange = (e)=>{
        const details = e.target.value
        setUsers({...users,product_details:details})
        if (details) {
            setErrors((prevErrors) => ({ ...prevErrors, product_details: "" }));
        }
    }
    
    const handlecategoryChange = (e)=>{
        const category = e.target.value
        setUsers({...users,category_id:category})
        if (category) {
            setErrors((prevErrors) => ({ ...prevErrors, category_id: "" }));
        }
    }
    
    const handlespecificationChange = async (e)=>{
        const specs = e.target.value
        setUsers({...users,product_size:specs})
        if(specs){
            setErrors((prevErrors)=>({...prevErrors,product_size:""}))
        }
        const data = await getSpecsByid(specs.id)
        setspecifications(data)
        console.log(data,"pppppppp");
    }
    
    const addcategoryy = async () => {
        if (!validateForm()) return;
        const formData = new FormData();
        formData.append("product_name", users.product_name);
        formData.append("product_details", users.product_details);
        formData.append("category_id", users.category_id);
        formData.append("product_size",users.product_size)
        formData.append("product_quantity",users.product_quantity)
        formData.append("product_price",users.product_price)
        formData.append("product_image", imageFile);  
        try {
            const response = await axios.post('http://localhost:1417/addproduct', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            if (response.data) {
                navigate("/products/list");
            }
        } catch (error) {
            console.log("Error adding category:", error);
        }
    }
    
    const backbutton = async()=>{
        try {
            navigate("/products/list")            
        } catch (error) {
            console.log(error);
        }
    }
    
    const addMoreSpecs = () => {
        setAdditionalSpecs((prev) => [
            ...prev,
            { size: "", quantity: "", price: "" }, 
        ]);
    };
    
    const handleAdditionalSpecChange = (index, field, value) => {
        const updatedSpecs = [...additionalSpecs];
        updatedSpecs[index][field] = value;
        setAdditionalSpecs(updatedSpecs);
    };
    
    const removeSpec = (index) => {
        setAdditionalSpecs((prev) => prev.filter((_, i) => i !== index));
    };
    
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
                                                            <input type="text" className="form-control" placeholder="Name"
                                                                id="name"  
                                                                onChange={handleNameChange}
                                                            />
                                                            {errors.product_name && <span className='text-danger'>{errors.product_name}</span>}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Price</label>
                                                            <input type="number" className="form-control" placeholder="Name"
                                                                id="name" onChange={handlepriceChange}
                                                            />
                                                            {errors.product_price && <span className='text-danger'>{errors.product_price}</span>}
                                                        </div>
                                                    </div> */}
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Details</label>
                                                            <input type="text" className="form-control" placeholder="Details"
                                                                id="Details" onChange={handledetailsChange}/>
                                                            {errors.product_details && <span className='text-danger'>{errors.product_details}
                                                            </ span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="image">Image</label>
                                                            <input type="file" className="form-control" 
                                                                onChange={handleImageChange} />
                                                            {errors.image && <span className='text-danger'>{errors.image}</span>}
                                                            <br />
                                                            {previewImage && (
                                                                <img src={previewImage} alt="Selected" style={{ width: '100px', marginTop: '10px' }} />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="subcategory">Category</label>
                                                            <select className="form-control" id="subcategory"
                                                                onChange={handlecategoryChange}>
                                                                <option value="">Select Category</option>
                                                                {categories.map((category) => (
                                                                    <option key={category.id} value={category.id}>
                                                                        {category.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.category_id && <span className='text-danger'>{errors.category_id}</span>}
                                                        </div>
                                                    </div>
                                                </div><br></br>
                                                
                                                <div className="row">
                                                    <h3 style={{fontWeight:"700"}}>Add Specifications</h3><br></br><br></br>
                                                <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="specifications">Size</label>
                                                            <select className="form-control" id="specifications"
                                                                onChange={handlespecificationChange}>
                                                                <option value="">Select Size</option>
                                                                <option value="S">S</option>
                                                                <option value="M">M</option>
                                                                <option value="L">L</option>
                                                                <option value="XL">XL</option>
                                                                <option value="XXL">XXL</option>
                                                                
                                                            </select>
                                                            {errors.product_size && <span className='text-danger'>{errors.product_size}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Quantity</label>
                                                            
                                                            <select  className="form-control" id="cars"  placeholder="Select Quantity" onChange={handleproductQuantity}>
                                                                {/* <option value="1" >Select Quantity</option> */}
                                                                <option >1</option>
                                                                <option >2</option>
                                                                <option >3</option>
                                                                <option >4</option>
                                                                <option >5+</option>
                                                            </select>
                                                            {errors.product_quantity && <span className='text-danger'>{errors.product_quantity}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Price</label>
                                                            <input type="text" className="form-control" placeholder="Price"
                                                                id="Details"  onChange={handlepriceChange}
                                                            />
                                                            {errors.product_quantity && <span className='text-danger'>{errors.product_quantity}</span>}
                                                        </div>
                                                    </div>
                                                </div>


                                                {additionalSpecs.map((spec, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="specifications">Size</label>
                                                            <select className="form-control" id="specifications"
                                                                onChange={handlespecificationChange}>
                                                                <option value="">Select Size</option>
                                                                {specs.map((spec) => (
                                                                    <option key={spec.id} value={spec.id}>
                                                                        {spec.size}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            {errors.specification_id && <span className='text-danger'>{errors.specification_id}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor={`quantity-${index}`}>Quantity</label>
                                                            <select
                                                                className="form-control"
                                                                id={`quantity-${index}`}
                                                                value={specifications.quantity}
                                                                onChange={(e) =>
                                                                    handleAdditionalSpecChange(index, "quantity", e.target.value)
                                                                }
                                                            >
                                                                <option value="">Select Quantity</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5+</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor={`price-${index}`}>Price</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id={`price-${index}`}
                                                                value={specifications.price}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 d-flex justify-content-end">
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => removeSpec(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                    <hr />
                                                </div>
                                            ))}

                                                <ul className="nav nav-pills" role="tablist" style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                                                <li className="nav-item">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={addMoreSpecs}>
                                                        Add More Specifications
                                                    </button>
                                                </li>
                                            </ul>

                                                <div className="col-12 d-flex flex-sm-row flex-column mt-2">
                                                        <button type="button" className="btn btn-primary mb-1 mb-sm-0 me-0 me-sm-1" onClick={addcategoryy}>
                                                            Add 
                                                        </button>
                                                        <button type="button" className="btn btn-outline-secondary mb-1 mb-sm-0 me-0 me-sm-1"
                                                            onClick={backbutton}>Back</button>
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

export default Addproduct
