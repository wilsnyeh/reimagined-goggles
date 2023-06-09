import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; 

const AuthToken = ({ token, setToken, setLoggedIn, loggedIn }) => {
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
          client_id: "cWJAoFN567mRPOc10isZZMomu17mBvGlbEyRrSZOYLJZspuR0w",
          client_secret: "N59RE4DeVfX9pCLIUBzR66nwXpxqGU0kGCbsV126",
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
      localStorage.setItem('token', token);
      localStorage.setItem('LoggedIn', loggedIn)
      navigate('/petfinder')
    } else {
      navigate('/')
    }
  }, [token]);
  //why didnt this throw an error before? it was trying to json parse the token
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    localStorage.getItem('LoggedIn')
    if (localToken) {
      setToken(localToken);
    }
  }, []);
  
  const isLoggedIn = () => {
    setLoggedIn(true);
  }

  // to keep the authentication process more concise 
  // we may approach this a few ways
  // when token is set, to set loggedIn true
  // and use loggedIn to validate access around other areas of the application
  // are there pitfalls to consider when we look at this approach?
  // the other being loggedIn may not be necessary, as a user may use just the token to navigate around the application
  // are there pitfalls to consider when we look at this approach?
  // another concept to consider is how JS is synchronous, in such that function calls unless specified, will run simultaneously, and that may not always be what we want to happen when we were attempting to render lots of data; and that perhaps the reason why some functions are 'failing' could be due to running simulatenously when in reality it requires an output of another function first
  return (
    <div className='login-container'>
      <input className='login-input' type="text" placeholder="username" />
      
      <input className='login-input' type="text" placeholder="password" />
      
      <button className='login-button'
        type="submit"
        onClick={() => {
          userAuth();
          isLoggedIn()
        }}
      >
        Login
      </button>
    </div>
  );
};

export default AuthToken;
