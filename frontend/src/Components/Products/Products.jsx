import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Includes/Navbar';
import Sidebar from '../Includes/Sidebar';
import { fetchProducts, fetchCategories, deleteproduct, getspecifications } from '../Services/ProductService';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2, Eye, Edit} from "react-feather";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState();
    const [specs, setspecs] = useState()
    const navigate = useNavigate()
    const hasFetched = useRef(false); 

    const notify = () => {
        toast.success("Success Notification !", {
            position: "top-right"
          });
    }
        

    const getData = async () => {
        try {
            const result = await fetchProducts();
            setUsers(result);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

   

    const getCategory = async () => {
        try {
            const result = await fetchCategories();
            setCategories(result);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };



    useEffect(() => {
        if(!hasFetched.current){
            getData();
            toast("Wow so easy!");
            getCategory();
            hasFetched.current=true
        }
    }, []);

    const deleteuser = async (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then(async(result) => {
          if (result.isConfirmed) {
            // console.log(id,"asdfghjk");
            await deleteproduct(id);
            console.log(id, "asddfghjkl;");
            
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            getData()
            navigate("/products/list")
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your  file is safe :)",
              icon: "error"
            });
          }
        });
      };

    return (
        <>
        <ToastContainer />

            <Navbar />
            <Sidebar />
            <div className="app-content content ">
                <div className="content-overlay" />
                <div className="header-navbar-shadow" />
                <div className="content-wrapper container-xxl p-0">
                    <div className="content-header row"></div>
                    <ul className="nav nav-pills" role="tablist" style={{display: "flex",alignItems:" center",justifyContent:" end"}}>
              <li className="nav-item">
                <Link to={`/products/add`} className="nav-link d-flex align-items-center active" id="account-tab" data-bs-toggle="tab" aria-controls="account" role="tab" aria-selected="true">
                  <Plus /> <span className="d-none d-sm-block">Add Product</span>
                </Link>
              </li>
            </ul>
                    <div className="content-body">
                        <section className="app-user-list">
                            <div className="card">
                                <div className="card-datatable table-responsive pt-0">
                                    <table className="user-list-table table">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Name</th>
                                                <th>Category Name</th>
                                                <th>SubCategory Name</th>
                                                {/* <th>Size</th> */}
                                                {/* <th>Product Quantity</th> */}
                                                {/* <th>Price</th> */}
                                                <th>Details</th>
                                                <th>Image</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length > 0 ? (
                                                users.map((user, index) => (
                                                    <tr key={user.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.product_name}</td>
                                                        <td>{user.category ? user.category.name : 'N/A'}</td>
                                                        <td>{user.category && user.category.subcategory? user.category.subcategory.name: 'N/A'}
                                                        </td>
                                                        {/* <td>{user.specifications ? user.specifications.size: "N/A"}</td> */}
                                                        {/* <td>{user.product_quantity}</td> */}
                                                        {/* <td>{user.specifications ? user.specifications.price : "N/A"}</td> */}
                                                        <td>{user.product_details}</td>
                                                        <td>
                                                            <img src={`http://localhost:1417/images/users/${user.product_image}`}
                                                                width={70} height={50} alt={user.product_name} />
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-sm btn-primary">
                                                                <Link to={`/products/editproduct/${user.id}`}  style={{ color: "white" }}><Edit width={15}  /></Link>
                                                            </button>
                                                            <button className="btn btn-sm btn-primary ms-1">
                                                                <Link to={`/products/view/${user.id}`} style={{ color: "white" }}><Eye width={15} /></Link>
                                                            </button>
                                                            <button className="btn btn-sm btn-danger ms-1" onClick={()=>deleteuser(user.id)}><Trash2 width={15} /></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center">No products found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Products;
