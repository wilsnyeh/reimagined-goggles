import { useNavigate } from "react-router";
import { useEffect } from "react";

export function ReturnToLogin({token, setLoggedIn}) {
  const navigate = useNavigate();
  const homeRedirect = () => {
    let path = "/";
    navigate(path);
  };

  useEffect(() => {

  })

  const handleReturnLoginSubmit = async () => {
    console.log('this is before the clear token', token)
    localStorage.clear(token);
    console.log('is this clearing the token?', token)
    setLoggedIn(false);
  };

  return (
    <>
      <h1>this is protected</h1>
      <button onClick={() => {
        // homeRedirect();
        // handleReturnLoginSubmit()
        homeRedirect();
      }}>go back to login</button>
    </>
  );
}
