import React from "react";
import Login from './Login/Login.js';
import Main from "./Main/Main.js";
import {useAuth0} from '@auth0/auth0-react';

// const ACTIONS = {
//   addAttribution: "addAttribution",
//   addError: "addError",
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case ACTIONS.addAttribution:
//       return { ...state, attribution: action.payload.value };
//     case ACTIONS.addError:
//       return { ...state, error: action.payload.value };
//     default:
//       return state;
//   }
// }

export default function App() {
  // const [state, dispatch] = React.useReducer(reducer, {
  //   attribution: null,
  //   error: null,
  // });

  let {isAuthenticated}=useAuth0();
  console.log(isAuthenticated);
  return (
    <div className="app-container">
      {isAuthenticated?<Main/>:<Login/>}
    </div>
  );
}
