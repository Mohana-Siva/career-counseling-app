import React from 'react';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
const grade = localStorage.getItem("grade");

const dashboardPath =
  grade === "10th"
    ? "/dashboard-10th"
    : grade === "11th12th"
    ? "/dashboard-11th12th"
    : "/select-grade";

  // ✅ Check if token exists
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login"); // redirect
  };

  const publicNavItems = [
    { path: "/", name: "Home" },
    { path: "/login", name: "Login" },
    { path: "/signup", name: "Sign Up" },
    { path: "/about", name: "About" }
  ];

  const privateNavItems = [
    { path: dashboardPath, name: "Dashboard" },
    { path: "/profile", name: "Profile" },
    { path: "/about", name: "About" }
  ];

  return (
    <BSNavbar 
      expand="lg" 
      fixed="top"
      className="custom-navbar"
      style={{
        width: '100vw',
        left: 0,
        right: 0
      }}
    >
      <Container>
        <BSNavbar.Brand 
          as={Link} 
          to="/" 
          className="d-flex align-items-center brand-logo"
        >
          <span className="logo-icon">🧭</span>
          <span className="logo-text ms-2">NextStep</span>
        </BSNavbar.Brand>
      
        <BSNavbar.Toggle aria-controls="navbar-nav" />
        
        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {(isLoggedIn ? privateNavItems : publicNavItems).map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={`nav-link-item ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="active-indicator"></span>
                )}
              </Nav.Link>
            ))}
            
            {isLoggedIn && (
              <Nav.Link
                className="nav-link-item"
                onClick={handleLogout}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
