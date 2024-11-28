import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Includes/Navbar';
import Sidebar from '../../Includes/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { fetchallusers } from '../../Services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Listing() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  
  const getData = async () => {
    try {
      const response = await fetchallusers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const deleteuser = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:1417/delete/${id}`).then(() => {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "User has been deleted.",
              "success"
            );
            getData();
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your data is safe :)",
            "error"
          );
        }
      });
  };
  
  const changestatus = async (user) => {
    try {
      const response = await axios.post('http://localhost:1417/statuschange', {
        id: user.id,
        currentStatus: user.status,
      });

      // Update the local user data with the new status from the backend
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id
            ? { ...u, status: response.data.status }
            : u
        )
      );
      notify(`Status changed to ${response.data.status === 0 ? "Active" : "Inactive"}!`);
    } catch (error) {
      console.error("Error changing status:", error);
      notify("Error changing status!", "error");
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      getData();
      hasFetched.current = true;
    }
  }, []);

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
            <section className="app-user-list">
              <div className="card">
                <div className="card-datatable table-responsive pt-0">
                  <table className="user-list-table table">
                    <thead className="table-light">
                      <tr>
                        <th>Sr No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>
                              <button
                                className={`btn btn-sm ${
                                  user.status === 0 ? 'btn-success' : 'btn-danger'
                                }`}
                                onClick={() => changestatus(user)}
                              >
                                {user.status === 0 ? "Active" : "Inactive"}
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger ms-1"
                                onClick={() => deleteuser(user.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
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
      <ToastContainer />
    </>
  );
}

export default Listing;
