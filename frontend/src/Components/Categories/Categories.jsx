import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Includes/Navbar'
import Sidebar from '../Includes/Sidebar'
import { json, Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { deleteCategory, fetchsubcategory } from "../Services/CategoryServices"
import { fetchCategories } from "../Services/ProductService"
import { Plus, Trash2, Eye, Edit} from "react-feather";



function Categories() {

  const { id } = useParams()
  const [users, setUsers] = useState("")
  const navigate = useNavigate()
  const hasFetched = useRef(false); 
  

  const getcategories = async () => {
    try {
      const result = await fetchCategories()
      setUsers(result)
    } catch (error) {
      console.log("error ", error);
    }
  }

  const getsubcategories = async () => {
    try {

      const data = await fetchsubcategory()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!hasFetched.current){
      getcategories()
      getsubcategories()
      hasFetched.current=true

    }
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      getcategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

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
        await deleteCategory(id);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        getcategories()
        navigate("/categories/list")
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
      <Navbar />
      <Sidebar />
      <div className="app-content content ">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper container-xxl p-0">
          <div className="content-header row"></div>
          <ul className="nav nav-pills" role="tablist" style={{ display: "flex", alignItems: " center", justifyContent: " end" }}>
            <li className="nav-item">
              <Link to={`/categories/add`} className="nav-link d-flex align-items-center active" id="account-tab" data-bs-toggle="tab" aria-controls="account" role="tab" aria-selected="true">
              <Plus/>   <span className="d-none d-sm-block">  Add Category</span>
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
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            {/* <td>{user?.subcategory?.name || 'No Subcategory'}</td> */}
                            <td><img src={`http://localhost:1417/images/users/${user.image}`} width={70} height={50}  ></img></td>
                            <td>
                              <button className="btn btn-sm btn-primary"><Link to={`/categories/editcategory/${user.id}`} style={{ color: "white" }}><Edit width={15} /></Link></button>
                              <button className="btn btn-sm btn-primary ms-1"><Link to={`/categories/view/${user.id}`} style={{ color: "white" }}><Eye width={15}/></Link></button>
                              <button className="btn btn-sm btn-danger ms-1" onClick={() => deleteuser(user.id)}  ><Trash2 width={15}/></button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No users found
                          </td>
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
  )
}

export default Categories
