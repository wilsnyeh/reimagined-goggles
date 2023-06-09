import { useNavigate } from "react-router";
import { useEffect } from "react";

export function ReturnToLogin({token, setLoggedIn, loggedIn, setToken  }) {
  const navigate = useNavigate();
  const homeRedirect = () => {
    let path = "/";
    navigate(path);
  };

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
