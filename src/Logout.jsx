import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout({ token, setLoggedIn, loggedIn }) {
  const navigate = useNavigate();

  const handleLogoutSubmit = async () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <>
      <button class="button-tr" onClick={handleLogoutSubmit}>Return to Auth</button>
    </>
  );
}
