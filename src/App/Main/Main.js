import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header/Header.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Search from "./Search/Search.js";
import Update from "./Update/Update.js";
import Review from "./Review/Review.js";
import Landing from "./Landing/Landing.js";
import Profile from "./Profile/Profile.js";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";

function reducer(stateMain, action) {
  localStorage.setItem("stateMain", JSON.stringify(stateMain));
  switch (action.type) {
    case "updateAttribution":
      return { ...stateMain, attribution: action.payload.value };
    case "updateError":
      return { ...stateMain, error: action.payload.value };
    case "updateSearchResults":
      return { ...stateMain, searchResults: action.payload.value };
    case "updateRevewCocktail":
      return { ...stateMain, reviewCocktail: action.payload.value };
    case "updateUserCocktails":
      return { ...stateMain, userCocktails: action.payload.value };
    default:
      return stateMain;
  }
}

function Main() {
  //open tools
  let { getIdTokenClaims } = useAuth0();
  let navigate = useNavigate();

  //set state
  const [stateMain, dispatch] = React.useReducer(
    reducer,
    JSON.parse(localStorage.getItem("stateMain")) || {
      attribution: null,
      error: null,
      searchResults: null,
      reviewCocktail: null,
      userCocktails: null,
    }
  );

  //keep local storage up to date
  React.useEffect(() => {
    localStorage.setItem("stateMain", JSON.stringify(stateMain));
  }, [stateMain]);

  //handler get request by id
  const handlerGetById = (id) => {
    // console.log(id)
    getIdTokenClaims().then((res) => {
      //get authentication to use in request
      let jwt = res.__raw;
      let config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: "get",
        baseURL: process.env.REACT_APP_SERVER,
        url: `/id?id=${id}`,
      };
      // console.log(config);
      axios(config)
        .then((res) => {
          let searchResults = res.data.drinks;
          // console.log(searchResults[0]);
          dispatch({
            type: "updateRevewCocktail",
            payload: { value: searchResults[0] },
          });
          navigate("/review");
        })
        //TODO: Handle error
        .catch((err) => console.log(err));
    });
  };

  // console.log(stateMain.reviewCocktail)

  return (
    <div className="main-container">
      <Header />
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>

        <Route
          exact
          path="/search"
          element={
            <Search
              searchResults={stateMain.searchResults}
              handlerGetById={handlerGetById}
              dispatch={dispatch}
            />
          }
        ></Route>

        <Route
          exact
          path="/review"
          element={
            <Review
              reviewCocktail={stateMain.reviewCocktail}
            />
          }
        ></Route>

        <Route
          exact
          path="/update"
          element={
            <Update
              reviewCocktail={stateMain.reviewCocktail}
            />
          }
        ></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default withAuthenticationRequired(Main, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
