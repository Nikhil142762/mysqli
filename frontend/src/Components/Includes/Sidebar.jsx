import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Lock, Info, BookOpen, Smartphone, Layers, Briefcase, Plus } from "react-feather";

function Sidebar() {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true" style={{zIndex:"1"}}>
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item me-auto">
            <Link className="navbar-brand" to="/dashboard">
              <span className="brand-logo">
                {/* SVG Logo */}
              </span>
              <h2 className="brand-text">Vuexy</h2>
            </Link>
          </li>
          <li className="nav-item nav-toggle">
            <a className="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse">
              {/* <Plus  onClick={toggleMenu}/> */}
              <i className="d-none d-xl-block collapse-toggle-icon font-medium-4 text-primary" data-feather="disc" data-ticon="disc" />
            </a>
          </li>
        </ul>
      </div>
      <div className="shadow-bottom" />
      <div className="main-menu-content">
        <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">

          <li className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
            <Link className="d-flex align-items-center" to="/dashboard">
              <Home />
              <span className="menu-title text-truncate">Dashboard</span>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/users/list') ? 'active' : ''}`}>
            <Link className="d-flex align-items-center" to="/users/list">
              <Users />
              <span className="menu-title text-truncate">Users</span>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/categories') ? 'active' : ''}`}>
            <Link className="d-flex align-items-center" to="/categories/list">
              <Layers/>
              <span className="menu-title text-truncate">Categories</span>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/subcategory') ? 'active' : ''}`}>
            <Link className="d-flex align-items-center" to="/subcategory/list">
              <Layers/>
              <span className="menu-title text-truncate">Sub-categories</span>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/products') ? 'active' : ''}`}>
            <Link className="d-flex align-items-center" to="/products/list">
              <Briefcase />
              <span className="menu-title text-truncate">Products</span>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/privacypolicy') ? 'active' : ''}`}>
            <Link className="d-flex align-items-center" to="/privacypolicy">
              <Lock />
              <span className="menu-title text-truncate">Privacy Policy</span>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/terms&conditions') ? 'active' : ''}`}>
            <Link className="d-flex align-items-center" to="/terms&conditions">
              <BookOpen />
              <span className="menu-title text-truncate">Terms & Conditions</span>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
            <Link className="d-flex align-items-center" to="/about">
              <Info />
              <span className="menu-title text-truncate">About Us</span>
            </Link>
          </li>

          <li className={`nav-item ${isActive('/contactus') ? 'active' : ''}`}>
            <Link className="d-flex align-items-center" to="/contactus">
              <Smartphone />
              <span className="menu-title text-truncate">Contact Us</span>
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
