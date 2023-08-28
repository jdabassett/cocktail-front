import React from "react";
import Login from './Login/Login.js';
import Main from "./Main/Main.js";
import {useAuth0} from '@auth0/auth0-react';
import Landing from './Main/Landing/Landing.js';



export default function App() {
  let [stateApp,setStateApp]=React.useState({show:false,artist:{
    author:"",
    link:"",
    image:""
    }});
  let {isAuthenticated}=useAuth0();

  const updateModalState = (object) => {
    // console.log('app page: updateModalState triggered');
    if(object.show){
      // console.log('app page: updateModalState triggered');
      setStateApp(prevState=>({show:object.show,artist:{author:object.author,link:object.link,image:object.image}}))
    } else {
      setStateApp(prevState=>({show:false,artist:{author:"",link:"",image:""}}))
    };
  };

  // console.log("app page:",stateApp);
  return (
    <div className="app-container">
      {isAuthenticated?
        <Main
        stateApp={stateApp}
        updateModalState={updateModalState}
        />:
        <>
          <Login/>
          <Landing
            stateApp={stateApp}
            updateModalState={updateModalState}
          />
        </>}
    </div>
  );
}
