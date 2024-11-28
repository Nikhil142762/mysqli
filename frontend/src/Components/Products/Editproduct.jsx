import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct, getspecifications, getSpecsByid, updateproduct } from '../Services/ProductService';
import Navbar from '../Includes/Navbar';
import Sidebar from '../Includes/Sidebar';
import { fetchallcategories } from '../Services/CategoryServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Editproduct() {
    const { id } = useParams();
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [specsprice, setspecsprice] = useState([]);
    const hasFetched = useRef(false);

    const [users, setUsers] = useState({
        product_name: "",
        category_id: "",
        product_price: "",
        product_quantity: "",
        product_size: "",
        product_details: "",
        product_image: "",
    });

    const notify = () => {
        toast.success("Success Notification !", {
            position: "top-right"
          });
    }

    const getproducts = async () => {
        const data = await fetchProduct(id);
        if (data) {
            getspecificationsbyId(data.specification_id);
        }
        setUsers(data);
    };

    const getspecificationsbyId = async () => {
        try {
            const data = await getSpecsByid(id);
            setspecsprice(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getcategories = async () => {
        try {
            const categoryList = await fetchallcategories();
            setCategories(categoryList);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('product_name', users.product_name);
            formData.append('product_price', users.product_price || specsprice[0]?.product_price);
            formData.append('product_details', users.product_details);
            formData.append('product_quantity', users.product_quantity || specsprice[0]?.product_quantity);
            formData.append('product_size', users.product_size || specsprice[0]?.product_size);
            formData.append('category_id', users.category_id);
            if (imageFile) {
                formData.append('product_image', imageFile);
            }
            const result = await axios.put(`http://localhost:1417/updateproduct/${id}`, formData);
            if (result) {
                navigate("/products/list");
                notify()
                
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setUsers({ ...users, product_image: file.name });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            getcategories();
            getproducts();
            hasFetched.current = true;
        }
    }, []);

    const backbutton = async () => {
        navigate("/products/list");
    };

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="app-content content ">
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
                                            <form className="form-validate" onSubmit={handleUpdateProduct}>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Name"
                                                                value={users.product_name}
                                                                id="name"
                                                                onChange={(e) =>
                                                                    setUsers({ ...users, product_name: e.target.value })
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="subcategory">Category</label>
                                                            <select
                                                                className="form-control"
                                                                id="subcategory"
                                                                value={users.category_id}
                                                                onChange={(e) =>
                                                                    setUsers({ ...users, category_id: e.target.value })
                                                                }
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
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="details">Details</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Details"
                                                                value={users.product_details}
                                                                id="details"
                                                                onChange={(e) =>
                                                                    setUsers({ ...users, product_details: e.target.value })
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="image">Image</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                onChange={handleImageChange}
                                                            />
                                                            <br />
                                                            {users.product_image && (
                                                                <img
                                                                    src={`http://localhost:1417/images/users/${users?.product_image}`}
                                                                    width={130}
                                                                    className="rounded-circle"
                                                                    height={130}
                                                                    alt="Product"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <h2>Specifications</h2>
                                                    {specsprice.length > 0 ? (
                                                        specsprice.map((spec, index) => (
                                                            <div key={index} className="col-md-6 mb-2">
                                                                <div className="mb-1">
                                                                    <label className="form-label">Size</label>
                                                                    <select
                                                                        className="form-control"
                                                                        value={users.product_size || spec.product_size}
                                                                        required
                                                                        onChange={(e) =>
                                                                            setUsers({ ...users, product_size: e.target.value })
                                                                        }
                                                                    >
                                                                        <option value="" disabled>
                                                                            Select Size
                                                                        </option>
                                                                        <option value="S">S</option>
                                                                        <option value="M">M</option>
                                                                        <option value="L">L</option>
                                                                        <option value="XL">XL</option>
                                                                        <option value="XXL">XXL</option>
                                                                    </select>
                                                                </div>
                                                                <div className="mb-1">
                                                                    <label className="form-label">Price</label>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        value={users.product_price || spec.product_price }
                                                                        onChange={(e) =>
                                                                            setUsers({ ...users, product_price: e.target.value })
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="mb-1">
                                                                    <label className="form-label">Quantity</label>
                                                                    <select
                                                                        className="form-control"
                                                                        value={users.product_quantity || spec.product_quantity}
                                                                        required
                                                                        onChange={(e) => setUsers({ ...users, product_quantity: e.target.value })}>
                                                                        <option value="" disabled>
                                                                            Select Quantity
                                                                        </option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No specifications available for this product.</p>
                                                    )}
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
        <ToastContainer />
        </>
    );
}

export default Editproduct;
