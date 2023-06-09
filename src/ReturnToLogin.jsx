import { useNavigate } from "react-router";
import { useEffect } from "react";

export function ReturnToLogin({token, setLoggedIn, loggedIn}) {
  const navigate = useNavigate();
  const homeRedirect = () => {
    let path = "/";
    navigate(path);
  };

  const handleReturnLoginSubmit = async () => {
    
    localStorage.clear();
    
    setLoggedIn(false);
  };
console.log('what is loggedin?', loggedIn)
  return (
    <>
      <h1>this is protected</h1>
      <button onClick={() => {
        // homeRedirect();
        handleReturnLoginSubmit()
        homeRedirect();
      }}>go back to login</button>
    </>
  );
}
