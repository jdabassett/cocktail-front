import React from 'react';
import LoginButton from './LoginButton.js'
// import { useAuth0 } from "@auth0/auth0-react";


export default function Login() {
  // let {isAuthenticated}=useAuth0();

  return (
    <div className="login-container">
      <LoginButton/>
    </div>
  )
}