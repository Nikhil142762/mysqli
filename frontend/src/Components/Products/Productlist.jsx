import React, { useEffect, useRef, useState } from 'react';
import { fetchProduct, getSpecsByid } from '../Services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Includes/Navbar';
import Sidebar from '../Includes/Sidebar';
import { fetchcategory } from '../Services/CategoryServices';
import { fetchsubcategory } from '../Services/SubcategoryServices';

function Productlist() {
    const { id } = useParams();
    const [subcategory, setsubcategory] = useState({ name: "", image: "" });
    const [specs, setspecs] = useState([]); // Initialize specs as an empty array
    const navigate = useNavigate();
    const hasFetched = useRef(false);

    const [category, setcategory] = useState({
        name: "",
        image: "",
        subcategory_id: ""
    });

    const [product, setproduct] = useState({
        product_name: "",
        product_details: "",
        product_image: "",
        category_id: ""
    });

    // Fetch Product Data
    const getproduct = async () => {
        try {
            const data = await fetchProduct(id);
            setproduct(data);
            if (data.category_id) {
                await getcategory(data.category_id);
            }
            await getspecs(data.id); // Fetch specifications using product ID
        } catch (error) {
            console.log("Error fetching product:", error);
        }
    };

    // Fetch Category Data
    const getcategory = async (categoryid) => {
        try {
            const data = await fetchcategory(categoryid);
            setcategory(data);
            if (data.subcategory_id) {
                await getsubcategory(data.subcategory_id);
            }
        } catch (error) {
            console.log("Error fetching category:", error);
        }
    };

    // Fetch Subcategory Data
    const getsubcategory = async (subcategoryID) => {
        try {
            const data = await fetchsubcategory(subcategoryID);
            setsubcategory(data);
        } catch (error) {
            console.log("Error fetching subcategory:", error);
        }
    };

    // Fetch Specifications
    const getspecs = async (productId) => {
        try {
            const data = await getSpecsByid(productId);
            if (Array.isArray(data)) {
                setspecs(data); // Ensure specs are properly stored
            } else {
                console.log("Unexpected specifications format:", data);
                setspecs([]);
            }
        } catch (error) {
            console.log("Error fetching specifications:", error);
        }
    };

    // Navigate Back
    const backbutton = async () => {
        navigate("/products/list");
    };

    useEffect(() => {
        if (!hasFetched.current) {
            getproduct();
            hasFetched.current = true;
        }
    }, []);

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
                                            <form className="form-validate">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="name">Name</label>
                                                            <input className="form-control" placeholder="Name" value={product.product_name} id="name" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="details">Details</label>
                                                            <input className="form-control" placeholder="Details" value={product.product_details} id="details" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="category-name">Category Name</label>
                                                            <input className="form-control" placeholder="Category Name" value={category.name} id="category-name" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="subcategory-name">Subcategory Name</label>
                                                            <input className="form-control" placeholder="Subcategory Name" value={subcategory.name} id="subcategory-name" readOnly />
                                                        </div><br />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="product-image">Product Image</label><br />
                                                            <img className="rounded" src={`http://localhost:1417/images/users/${product.product_image}`} width={120} height={100} alt="Product" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="category-image">Category Image</label><br />
                                                            <img className="rounded" src={`http://localhost:1417/images/users/${category.image}`} width={120} height={100} alt="Category" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-1">
                                                            <label className="form-label" htmlFor="subcategory-image">Subcategory Image</label><br />
                                                            <img className="rounded" src={`http://localhost:1417/images/users/${subcategory.image}`} width={120} height={100} alt="Subcategory" />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <h2>Specifications</h2>
                                                        {specs.length > 0 ? (
                                                            specs.map((spec, index) => (
                                                                <div key={index} className="col-md-6 mb-2">
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Size</label>
                                                                        <input className="form-control" value={spec.product_size} readOnly />
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Price</label>
                                                                        <input className="form-control" value={spec.product_price} readOnly />
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <label className="form-label">Quantity</label>
                                                                        <input className="form-control" value={spec.product_quantity} readOnly />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No specifications available for this product.</p>
                                                        )}
                                                    </div>
                                                    <div className="col-12 d-flex flex-sm-row flex-column mt-2">
                                                        <button type="button" className="btn btn-primary" onClick={backbutton}>
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

export default Productlist;
