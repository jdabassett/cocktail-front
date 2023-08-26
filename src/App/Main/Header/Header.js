import React from 'react';
import LogOutButton from './LogOutButton.js';
import { Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

export default function Header (props) {

  // console.log("header",props.userDetails.userEmail,props.userDetails.userPicture);
  return (
    <div className="header-container">
              <h1 className="header-title">{"{...} cocktail lover"}</h1>
              <Navbar expand="md" className="header-navbar">
              
              <Navbar.Brand></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto header-nav-container">
  
                  <NavItem><Link className="header-link nav-item" to="/">ABOUT</Link></NavItem>
                  <NavItem><Link className="header-link nav-item" to="/search">SEARCH</Link></NavItem>
                  <NavItem><Link className="header-link nav-item" to="/review">REVIEW</Link></NavItem>
                  <NavItem><Link className="header-link nav-item" to="/update">UPDATE</Link></NavItem>
                  <NavItem><Link className="header-link nav-item" to="/profile">PROFILE</Link></NavItem>
                  <Image className="header-image nav-item" style={{width:'40px'}} src={props.userDetails.userPicture} roundedCircle/>
       
                  <NavItem className="nav-item" ><LogOutButton/></NavItem>
                  
                </Nav>
              </Navbar.Collapse>
          
          </Navbar>
    </div>
  )
}