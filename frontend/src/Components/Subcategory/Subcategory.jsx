import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Includes/Navbar'
import Sidebar from '../Includes/Sidebar'
import { deletesubcategory, fetchallsubcategories } from '../Services/SubcategoryServices'
import { Plus, Trash2, Eye, Edit} from "react-feather";


function Subcategory() {
  
    const { id } = useParams()
    const [users, setUsers] = useState("")
    const navigate = useNavigate()

    const getsubcategories = async()=>{
        try {
            const data = await fetchallsubcategories()
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getsubcategories()
    },[])

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
          await deletesubcategory(id);
          console.log(id, "asddfghjkl;");
          
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          getsubcategories()
          navigate("/subcategory/list")
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
            <ul className="nav nav-pills" role="tablist" style={{display: "flex",alignItems:" center",justifyContent:" end"}}>
              <li className="nav-item">
                <Link to={`/subcategory/add`} className="nav-link d-flex align-items-center active" id="account-tab" data-bs-toggle="tab" aria-controls="account" role="tab" aria-selected="true">
                  <Plus/> <span className="d-none d-sm-block">Add Sub-category</span>
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
                              <td>{user.category ? user.category.name:"NA"}</td>
                              <td><img src={`http://localhost:1417/images/users/${user.image}`} width={70} height={50}  ></img></td>
                              <td>
                                <button className="btn btn-sm btn-primary"><Link to={`/subcategory/editsubcategory/${user.id}`} style={{ color: "white" }}><Edit width={15} /></Link></button>
                                <button className="btn btn-sm btn-primary ms-1"><Link to={`/subcategory/view/${user.id}`} style={{ color: "white" }}><Eye width={15} /></Link></button>
                                <button className="btn btn-sm btn-danger ms-1" onClick={() => deleteuser(user.id)}  ><Trash2 width={15} /></button>
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

export default Subcategory
