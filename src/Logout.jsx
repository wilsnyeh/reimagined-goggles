import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout({ token, setLoggedIn, loggedIn }) {
  const navigate = useNavigate();


  const handleLogoutSubmit = async () => {
    localStorage.clear();
    if (!token) {
      setLoggedIn(false);
      navigate("/");
    }
  };
  return (
    <>
      {/* {!loggedIn && <Navigate to="/" />} */}
      <button onClick={handleLogoutSubmit}>logout</button>
    </>
  );
}
