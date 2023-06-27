import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useContext } from "react";
import { TokenContext } from "./TokenContext";

export function ReturnToLogin({setLoggedIn, loggedIn }) {
  const navigate = useNavigate();
  const homeRedirect = () => {
    let path = "/";
    navigate(path);
  };

  const {token, setToken} = useContext(TokenContext)

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    localStorage.getItem('LoggedIn')
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const handleReturnLoginSubmit = async () => {
    localStorage.clear();
  };
  return (
    <>
      <h1>this is protected</h1>
      <button onClick={() => {
        handleReturnLoginSubmit()
        homeRedirect();
      }}>go back to login</button>
    </>
  );
}
