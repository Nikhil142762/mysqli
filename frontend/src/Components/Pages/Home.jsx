import React, { useState, useEffect, useRef } from 'react';
import Header from '../Includes/Header';
import Footer from '../Includes/Footer';
import Sidebar from '../Includes/Sidebar';
import Navbar from '../Includes/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Layers, Users } from "react-feather";
import LineGraph from '../Pages/LineGraph';
import { fetchallusers } from '../Services/UserServices';
import { fetchallcategories } from '../Services/CategoryServices';
import { fetchProducts } from '../Services/ProductService';
import { fetchallsubcategories } from '../Services/SubcategoryServices';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
  const [users, setUsers] = useState();
  const [data, setdata] = useState();
  const [category, setcategory] = useState();
  const [products, setproducts] = useState();
  const [subcategory, setsubcategory] = useState();
  const hasFetched = useRef(false); 
  const [auths, setAuths] = useState(() => {
    const auth = localStorage.getItem('user');
    return auth ? JSON.parse(auth) : null;
  });

  const navigate = useNavigate();
  const getUserDataAndCheckLogin = async () => {
    try {
      if (auths && auths.id) {
        const response = await axios.get(`http://localhost:1417/read/${auths.id}`);
        const result = response.data.body;
        setUsers(result);
        if (result && result.logintime !== auths.logintime) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setAuths(null);
          navigate("/signup");
        }
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const [userResult, categoryResult, productResult, subcategoryResult] = await Promise.all([
        fetchallusers(),
        fetchallcategories(),
        fetchProducts(),
        fetchallsubcategories()
      ]);

      setdata(userResult);
      setcategory(categoryResult);
      setproducts(productResult);
      setsubcategory(subcategoryResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if(!hasFetched.current){
      getUserDataAndCheckLogin();
      fetchData();
      hasFetched.current=true
    }
  }, [auths, navigate]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row match-height">
                <div className="col-xl-12 col-md-12 col-12">
                  <div className="card card-statistics">
                    <div className="card-header">
                      <h4 className="card-title">Statistics</h4>
                    </div>
                    <div className="card-body statistics-body">
                      <div className="row">
                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div className="d-flex flex-row">
                            <div className="avatar bg-light-primary me-2">
                              <div className="avatar-content">
                                <Link to={"/users/list"}>
                                <Users />
                                </Link>
                              </div>
                            </div>
                            <div className="my-auto">
                              <h4 className="fw-bolder mb-0">{data?.length}</h4>
                              <p className="card-text font-small-3 mb-0">
                              <Link to={"/users/list"} style={{color:"black"}}>Users</Link></p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div className="d-flex flex-row">
                            <div className="avatar bg-light-info me-2">
                              <div className="avatar-content">
                                <Link to={"/categories/list"}><Layers /></Link>
                              </div>
                            </div>
                            <div className="my-auto">
                              <h4 className="fw-bolder mb-0">{category?.length}</h4>
                              <p className="card-text font-small-3 mb-0">
                              <Link to={"/categories/list"} style={{color:"black"}}>Categories</Link></p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                          <div className="d-flex flex-row">
                            <div className="avatar bg-light-danger me-2">
                              <div className="avatar-content">
                              <Link to={"/products/list"}><Briefcase /></Link>
                              </div>
                            </div>
                            <div className="my-auto">
                              <h4 className="fw-bolder mb-0">{products?.length}</h4>
                              <p className="card-text font-small-3 mb-0">
                                <Link to={"/products/list"} style={{color:"black"}}>Products</Link></p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                          <div className="d-flex flex-row">
                            <div className="avatar bg-light-success me-2">
                              <div className="avatar-content">
                                <Link to={"/subcategory/list"}><Layers /></Link>
                              </div>
                            </div>
                            <div className="my-auto">
                              <h4 className="fw-bolder mb-0">{subcategory?.length}</h4>
                              <p className="card-text font-small-3 mb-0"><Link to={"/subcategory/list"} style={{color:"black"}}>SubCategories</Link></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <section id="chartjs-chart">
                  <div className="row">
                    <div className="col-xl-12 col-md-12 col-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">Statistics</h4>
                        </div>
                        <div className="card-body">
                          <LineGraph />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="sidenav-overlay" />
      <div className="drag-target" />
      <ToastContainer />

    </>
  );
}

export default Home;
