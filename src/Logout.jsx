import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout({ token, setLoggedIn, loggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn && !token) {
        navigate('/')
    }
  },[loggedIn])

  const handleLogoutSubmit = async () => {
    localStorage.clear(token);
    setLoggedIn(false);
  };
  return (
    <>
      {/* {!loggedIn && <Navigate to="/" />} */}
      <button onClick={handleLogoutSubmit}>
        logout
      </button>
    </>
  );
}
