import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Includes/Navbar';
import Sidebar from '../Includes/Sidebar';
import axios from 'axios';

function ResetPassword() {
    const { id } = useParams();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = async () => {
        try {
            const data = await axios.post(`http://localhost:1417/changePassword/${id}`) 
            console.log(data);
            
            console.log(id,"----------");
        } catch (error) {
            console.log(error);
        }
    }
       

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="app-content">
                <div className="content-overlay" />
                <div className="header-navbar-shadow" />
                <div className="content-wrapper">
                    <div className="content-header row"></div>
                    <div className="content-body">
                        <div className="auth-wrapper auth-v1 px-2t">
                            <div className="auth-inner py-2">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <h4 className="card-title mb-1">Reset Password 🔒</h4>
                                        <p className="card-text mb-2">
                                            Your new password must be different from previously used passwords
                                        </p>
                                        <div className="mb-1">
                                            <label className="form-label" htmlFor="old-password">Old Password</label>
                                            <input
                                                type="password"
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                className="form-control" required/>
                                        </div>
                                        <div className="mb-1">
                                            <label className="form-label" htmlFor="new-password">New Password</label>
                                            <input
                                                type="password"
                                                
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="form-control" required
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                                            <input
                                                type="password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="form-control" required
                                            />
                                        </div>
                                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                        {successMessage && <p className="text-success">{successMessage}</p>}
                                        <button className="btn btn-primary w-100" onClick={handlePasswordChange}>
                                            Set New Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
