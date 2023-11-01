import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JRT from "./assets/Curious_JRT.mp4";
import "./App.css";
import { TokenContext } from "./TokenContext";

const AuthToken = ({ setLoggedIn, loggedIn }) => {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  async function userAuth() {
    try {
      const petFinderUrl = "https://api.petfinder.com/v2/oauth2/token";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
        }),
      };
      const res = await fetch(petFinderUrl, options);
      const json = await res.json();
      let token = json.access_token;
      setToken(token);
      return `Bearer ${token}`;
    } catch (error) {
      console.error("error on token", error);
    }
  }

  // this checks if token is true, then stores token into local storage and redirects
  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("token", token);
      localStorage.setItem("LoggedIn", loggedIn);
      navigate("/petfinder");
    } else {
      navigate("/");
    }
  }, [token]);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    localStorage.getItem("LoggedIn");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const isLoggedIn = () => {
    setLoggedIn(true);
  };

  // useAuth to hold onto token, and when the token is needed useAuth to pass this around
  return (
    <>
      <div className="video-background">
        <video autoPlay loop muted className='background-video'>
          <source src={JRT} type='video/mp4' />
        </video>
        <div className="login-container">
          <button
            className="login-button"
            type="submit"
            onClick={() => {
              userAuth();
              isLoggedIn();
            }}
          >
            Get Authed
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthToken;
