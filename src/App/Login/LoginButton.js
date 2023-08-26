
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from 'react-bootstrap/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button
            className="logButtons header-button"
            onClick={() => loginWithRedirect()}>Login</Button>;
};

export default LoginButton;