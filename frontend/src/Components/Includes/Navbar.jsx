import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { User, Lock, LogOut  } from "react-feather";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NavbarComponent() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const logout = () => {
        toast.info("user Logged out ");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate("/signup");
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    return (
        <>
        <Navbar bg="light" variant="light" expand="lg" className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-shadow container-xxl mb-3">
            <div className="navbar-container d-flex content">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown 
                            title={<div className="d-flex align-items-center">
                                    <div className="user-nav d-sm-flex d-none">
                                        <span className=" text-dark" style={{color:"#141313 !important"}}> {user ? user.name : 'Guest'}</span>
                                    </div>
                                    <Image roundedCircle src={user?.image ? `http://localhost:1417/images/users/${user.image}` : 
                                    `http://localhost:1417/images/users/default.png`} alt="avatar" height={40} width={40} className="ms-2" />
                                </div>}id="dropdown-user" align="end"
                        >
                            <NavDropdown.Item as={Link} to="/profile">
                            <User  width={22} height={18} />  Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to={`/passwordreset/${user?.id}`}>
                                <Lock width={22} height={18}  /> Change Password
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>
                                <LogOut width={22}  height={18} /> Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>


        <ToastContainer />

        </>

    )
}

export default NavbarComponent;
