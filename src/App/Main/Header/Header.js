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
              <Navbar expand="md" className="header">
              
              <Navbar.Brand></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto nav-container">
  
                  <NavItem><Link to="/">ABOUT</Link></NavItem>
                  <NavItem><Link to="/search">SEARCH</Link></NavItem>
                  <NavItem><Link to="/review">REVIEW</Link></NavItem>
                  <NavItem><Link to="/update">UPDATE</Link></NavItem>
                  <NavItem><Link to="/profile">PROFILE</Link></NavItem>
                  <Image style={{width:'40px'}} src={props.userDetails.userPicture} roundedCircle/>
       
                  <NavItem><LogOutButton/></NavItem>
                  
                </Nav>
              </Navbar.Collapse>
          
          </Navbar>
    </div>
  )
}