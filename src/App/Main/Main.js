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
import oneCocktail from "../../Data/data_one-cocktail.json";

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
    case "updateDisplayHints":
      return { ...stateMain, displayHints: {...stateMain.displayHints,...action.payload.value} };
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
    // TODO: JSON.parse(localStorage.getItem("stateMain")) ||
    {
      attribution: null,
      error: null,
      searchResults: null,
      reviewCocktail: null||oneCocktail,
      userCocktails: null,
      displayHints: {component:"",disable:true},
    }
  );

  //keep local storage up to date
  React.useEffect(() => {
    localStorage.setItem("stateMain", JSON.stringify(stateMain));
  });

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

  //put or post updated cocktail to user database
  const submitUpdatedCocktail = (e) => {
    e.preventDefault();
    console.log('submitUpdatedCocktail triggered');
      //formate results from form into object to be put or posted
      let _id = stateMain.reviewCocktail._id || null;
      let idDrink = stateMain.reviewCocktail.idDrink;
      let strDrink = e.target.strDrinkInput.value;
      let strGlass = e.target.strGlassInput.value;
      let strDrinkThumb = stateMain.reviewCocktail.strDrinkThumb;
      let strNotes = e.target.strNotesInput.value;
  
      let arrayInstructions = [];
      arrayInstructions =
        updateArray(e, "instruction") ||
        stateMain.reviewCocktail.arrayInstructions.forEach((item) =>
          arrayInstructions.push(item)
        );
  
      let arrayMeasuredIngredients = [];
      arrayMeasuredIngredients =
        updateArray(e, "ingredient") ||
        stateMain.reviewCocktail.arrayMeasuredIngredients.forEach((item) =>
          arrayMeasuredIngredients.push(item)
        );
  
      let formatedCocktail = {
        idDrink: idDrink,
        strDrink: strDrink,
        strGlass: strGlass,
        strDrinkThumb: strDrinkThumb,
        arrayInstructions: arrayInstructions,
        arrayMeasuredIngredients: arrayMeasuredIngredients,
        strNotes: strNotes,
      };

      let method = _id ? "put" : "post";
      let url = _id ? `/updateCocktail/${_id}` : `/createCocktail`;
      if (_id) {
        formatedCocktail["_id"] = _id;
      };

      console.log(formatedCocktail, method, url);

      getIdTokenClaims()
      .then((res) => {
        let jwt = res.__raw;
        let userEmail = res.email;
        formatedCocktail['strUserEmail']=userEmail;
        let config = {
          headers: { authorization: `Bearer ${jwt}`, email: `${userEmail}` },
          method: method,
          data: formatedCocktail,
          baseURL: process.env.REACT_APP_SERVER,
          url: url,
        };
        // console.log(formatedCocktail,config);
        axios(config)
          .then((res) => {
            let savedCocktail = res.data;
            dispatch({
              type: "updateRevewCocktail",
              payload: { value: savedCocktail },
            });
            navigate("/review");
          })
          .catch((err) => {
            //TODO: handle error when request fails
          });
      })
      .catch((err) => {
        //TODO: handle error when auth0 token request fails
      });
  };

  const submitReviewCocktail = () => {
    console.log('submitRevewCocktail triggered');
    let _id = stateMain.reviewCocktail._id || null;
      let idDrink = stateMain.reviewCocktail.idDrink;
      let strDrink = stateMain.reviewCocktail.strDrink;
      let strGlass = stateMain.reviewCocktail.strGlass;
      let strDrinkThumb = stateMain.reviewCocktail.strDrinkThumb;
      let strNotes = stateMain.reviewCocktail.strNotes;
  
      let arrayInstructions = stateMain.reviewCocktail.arrayInstructions;
  
      let arrayMeasuredIngredients = stateMain.reviewCocktail.arrayMeasuredIngredients;
  
      let formatedCocktail = {
        idDrink: idDrink,
        strDrink: strDrink,
        strGlass: strGlass,
        strDrinkThumb: strDrinkThumb,
        arrayInstructions: arrayInstructions,
        arrayMeasuredIngredients: arrayMeasuredIngredients,
        strNotes: strNotes,
      };

      let method = _id ? "put" : "post";
      let url = _id ? `/updateCocktail/${_id}` : `/createCocktail`;
      if (_id) {
        formatedCocktail["_id"] = _id;
      };

      console.log(formatedCocktail, method, url);

      getIdTokenClaims()
      .then((res) => {
        let jwt = res.__raw;
        let userEmail = res.email;
        formatedCocktail['strUserEmail']=userEmail;
        let config = {
          headers: { authorization: `Bearer ${jwt}`, email: `${userEmail}` },
          method: method,
          data: formatedCocktail,
          baseURL: process.env.REACT_APP_SERVER,
          url: url,
        };
        // console.log(formatedCocktail,config);
        axios(config)
          .then((res) => {
            let savedCocktail = res.data;
            dispatch({
              type: "updateRevewCocktail",
              payload: { value: savedCocktail },
            });
            navigate("/review");
          })
          .catch((err) => {
            //TODO: handle error when request fails
          });
      })
      .catch((err) => {
        //TODO: handle error when auth0 token request fails
      });
    };
  

  const updateArray = (e, string) => {
    let returnArray = [];
    for (let i = 0; i < 1000; i++) {
      if (e.target[`${string}${i}Input`]) {
        returnArray.push(e.target[`${string}${i}Input`].value);
      } else {
        break;
      }
    }
    return returnArray;
  };

  // console.log('main',stateMain.reviewCocktail);

  return (
    <div className="main-container">
      <Header dispatch={dispatch} displayHints={stateMain.displayHints} />

      <Routes>
        <Route exact path="/" element={<Landing />}></Route>

        <Route
          exact
          path="/search"
          element={
            <Search
              dispatch={dispatch}
              displayHints={stateMain.displayHints}
              handlerGetById={handlerGetById}
              searchResults={stateMain.searchResults}
            />
          }
        ></Route>

        <Route
          exact
          path="/review"
          element={
            <Review
              dispatch={dispatch}
              displayHints={stateMain.displayHints}
              reviewCocktail={stateMain.reviewCocktail}
              submitReviewCocktail={submitReviewCocktail}
            />
          }
        ></Route>

        <Route
          exact
          path="/update"
          element={
            <Update
              dispatch={dispatch}
              displayHints={stateMain.displayHints}
              reviewCocktail={stateMain.reviewCocktail}
              submitUpdatedCocktail={submitUpdatedCocktail}
            />
          }
        ></Route>
        <Route
          exact
          path="/profile"
          element={
            <Profile
              dispatch={dispatch}
              displayHints={stateMain.displayHints}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default withAuthenticationRequired(Main, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
