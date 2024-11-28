import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const notify = () => {
        toast.success("Success Notification !", {
            position: "top-right"
          });
    }

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (req, res) => {
        try {
            const response = await axios.post('http://localhost:1417/login', {
                email,
                password,
            });
            const result = response.data;
            console.log(result);
            if (result) {
                notify()
                localStorage.setItem('user', JSON.stringify(result.users));
                localStorage.setItem('token', result.token);
                // req.session.user = result
                navigate('/'); 
            } else {
                console.log('Please enter correct values');
            }
        } catch (error) {
            console.error('Login error:', error);
            // alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
        
       
        <div className="container mt-4">
            <div className="col-md-6" style={{ margin: 'auto' }}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} 
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} 
                    />
                </div>
                <button type="button" onClick={handleLogin} className="btn btn-primary">Submit</button>
            </div>
        </div>
        <ToastContainer />
</>
    );
}

export default Login;





