
import React from 'react';
// import {useAuth0} from '@auth0/auth0-react';
import Header from './Header/Header.js';
import {Routes,Route} from 'react-router-dom';
import Search from './Search/Search.js';
import Update from './Update/Update.js';
import Review from './Review/Review.js';
import Landing from './Landing/Landing.js';
import Profile from './Profile/Profile.js';
import { withAuthenticationRequired } from '@auth0/auth0-react';

function Main () {
  // let {isAuthenticated,user,getIdTokenClaims}=useAuth0();
  // console.log(isAuthenticated);
  // getIdTokenClaims().then(res=> console.log(res.__raw))
  return (
    <div className="main-container">
      <Header/>
      <Routes>
        <Route
          exact path='/landing'
          element={<Landing/>}
        >
        </Route>
        <Route
          exact path='/search'
          element={<Search/>}
        >
        </Route>
        <Route
          exact path='/review'
          element={<Review/>}
        >
        </Route>
        <Route
          exact path='/update'
          element={<Update/>}
        >
        </Route>
        <Route
          exact path='/profile'
          element={<Profile/>}
        >
        </Route>

      </Routes>
      
    </div>
  )
};

export default withAuthenticationRequired(Main, {
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});