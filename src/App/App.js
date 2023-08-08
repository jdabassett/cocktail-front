import "./App.css";
import React from "react";
import Header from "./Header/Header.js";
import ErrorModal from "./ErrorModal/ErrorModal.js";
import AttributionModal from "./AttributionModal/AttributionModal.js";
import Main from "./Main/Main.js";

const ACTIONS = {
  addAttribution: "addAttribution",
  addError: "addError",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.addAttribution:
      return { ...state, attribution: action.payload.value };
    case ACTIONS.addError:
      return { ...state, error: action.payload.value };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    attribution: null,
    error: null,
  });

  return (
    <div className="app-container">
      <Header />
      {state.error && <ErrorModal />}
      {state.attribution && <AttributionModal />}
      <Main />
    </div>
  );
}
