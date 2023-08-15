import React from "react";
// import {useAuth0} from '@auth0/auth0-react';
import Header from "./Header/Header.js";
import { Routes, Route } from "react-router-dom";
import Search from "./Search/Search.js";
import Update from "./Update/Update.js";
import Review from "./Review/Review.js";
import Landing from "./Landing/Landing.js";
import Profile from "./Profile/Profile.js";
import { withAuthenticationRequired } from "@auth0/auth0-react";


function reducer(state, action) {
  switch (action.type) {
    case 'updateAttribution':
      return { ...state, attribution: action.payload.value };
    case 'updateError':
      return { ...state, error: action.payload.value };
    case 'updateSearchResults':
      return { ...state, searchResults: action.payload.value };
    case 'updateRevewCocktail':
      return { ...state, reviewCocktail: action.payload.value };
    case 'updateUserCurrentCocktail':
      return { ...state, userCurrentCocktail: action.payload.value };
    case 'updateUserCocktails':
      return { ...state, userCocktails: action.payload.value };
    default:
      return state;
  }
}

function Main() {
  // let {isAuthenticated,user,getIdTokenClaims}=useAuth0();
  // getIdTokenClaims().then(res=> console.log(res.__raw))

  const [state, dispatch] = React.useReducer(reducer, {
    attribution: null,
    error: null,
    searchResults: null,
    reviewCocktail: null,
    userCurrentCocktail: null,
    userCocktails: null,
  });

  const handlerUpdateMain = (value) => {
    dispatch({type:'updateSearchResults',payload:{value:value}})
    // console.log(value);
  }


  return (
    <div className="main-container">
      <Header />
      <Routes>
        <Route exact path="/" element={
          <Landing />}></Route>
        <Route exact path="/search" element={
          <Search 
            searchResults={state.searchResults}
            handlerUpdateMain={handlerUpdateMain}
            dispatch={dispatch}/>}></Route>
        <Route exact path="/review" element={
          <Review />}></Route>
        <Route exact path="/update" element={
          <Update />}></Route>
        <Route exact path="/profile" element={
          <Profile />}></Route>
      </Routes>
    </div>
  );
}

export default withAuthenticationRequired(Main, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
