import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout({ token, setLoggedIn, loggedIn }) {
  const navigate = useNavigate();


  const handleLogoutSubmit = async () => {
    localStorage.clear();
    setLoggedIn(false);
    // if (!token) {
      navigate("/");
    // }

  };
  return (
    <>
      {/* {!loggedIn && <Navigate to="/" />} */}
      {/* {loggedIn &&  */}
        <button onClick={handleLogoutSubmit}>Return to Auth</button>
      {/* } */}
      
    </>
  );
}
