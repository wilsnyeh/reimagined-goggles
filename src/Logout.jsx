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
      <button className="logout-button" onClick={handleLogoutSubmit}>Return to Auth</button>
    </>
  );
}
