import React, { useEffect, useState } from 'react'
import Sidebar from '../Includes/Sidebar';
import Navbar from '../Includes/Navbar';
import axios from 'axios';
import { fetchPrivacypolicy } from '../Services/CmsService';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';


function PrivacyPolicy() {
  const [user, setUser] = useState({
    title: "",
    content: ""
  });
  const [dataa, setDataa] = useState(null);

  useEffect(() => {
    const getCms = async () => {
      try {
        const  data  = await fetchPrivacypolicy();
        // const result = data.body;
        setDataa(data);
        setUser({
          title: data?.title || "",
          content: data?.content || ""
        });
      } catch (error) {
        console.error("Error fetching CMS data", error);
      }
    };
    getCms();
  }, []);

  const contentChange = (e, editor) => {
    const data = editor.getData(); // Retrieve the content from CKEditor
    setUser(prevUser => ({
      ...prevUser,
      content: data
    }));
  };

  const update = async () => {
    try {
      Swal.fire({
        title: " Sucessfull!",
        text: "About Us Updated Sucessfully!",
        icon: "success"
      }).then( async(result)=>{
        if (result.isConfirmed) {
          const response =  await axios.put("http://localhost:1417/privacypolicy", user);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          getCms()
        } 
      })
    } catch (error) {
      console.error("Error updating CMS data", error);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="app-content content">
        <div className="content-overlay" />
        <div className="header-navbar-shadow" />
        <div className="content-wrapper container-xxl p-0">
          <div className="content-body">
            <div className="blog-edit-wrapper">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-start">
                        <div className="avatar me-75">
                          <img
                            src="./src/assets/app-assets/images/portrait/small/avatar-s-9.jpg"
                            width={38}
                            height={38}
                            alt="Avatar"
                          />
                        </div>
                        <div className="author-info">
                          <p className="card-text">May 24, 2020</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="row">
                          <div className="col-md-12 col-12">
                            <div className="mb-2">
                              <label className="form-label" htmlFor="blog-edit-title">
                                Title
                              </label>
                              <input
                                type="text"
                                id="blog-edit-title"
                                className="form-control"
                                name="title"
                                value={user.title} readOnly
                                onChange={(e) => setUser({ ...user, title: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="mb-2">
                              <label className="form-label">Content</label>
                              <div id="blog-editor-wrapper">
                                <div id="blog-editor-container">
                                <div className="editor">
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={user.content} 
                                      onChange={contentChange} 
                                      className="form-control"
                                      style={{ border: "1px solid #0c0c0c1f" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mt-50">
                            <button
                              type="button"
                              className="btn btn-primary me-1"
                              onClick={update}
                            >
                              Update
                            </button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default PrivacyPolicy
