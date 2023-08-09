
import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import LogOutButton from '../Login/LogOutButton.js';

export default function Main () {
  let {isAuthenticated,user}=useAuth0();
  // console.log(isAuthenticated);
  return (
    <div className="main-container">
      {isAuthenticated?<p>Hello {user.name}</p>:null}
      <p>Main Boogers</p>
      <LogOutButton/>
    </div>
  )
}