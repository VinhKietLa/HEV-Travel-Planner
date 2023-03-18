import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../styles/navbar.css";
import { FaBars } from "react-icons/fa";

function NavTabs() {
  return (
    <Navbar className="navbar d-flex" sticky="top" collapseOnSelect expand="lg">
      <Container className="nav-container">
        {/* <Navbar.Brand href="#home">
          <img
            alt=""
            src={}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand> */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          children={<FaBars style={{ color: "white" }} />}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/places-to-see"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Places To See
            </NavLink>

            <NavLink
              to="/flights"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Flights
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavTabs;
