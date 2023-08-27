import React from "react";
import Login from './Login/Login.js';
import Main from "./Main/Main.js";
import {useAuth0} from '@auth0/auth0-react';
import Landing from './Main/Landing/Landing.js';



export default function App() {
  let {isAuthenticated}=useAuth0();

  return (
    <div className="app-container">
      {isAuthenticated?
        <Main/>:
        <>
          <Login/>
          <Landing/>
        </>}
    </div>
  );
}
