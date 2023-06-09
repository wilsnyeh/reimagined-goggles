import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; 

const AuthToken = ({ token, setToken, setLoggedIn, loggedIn }) => {
  const navigate = useNavigate();

  async function userAuth() {
    // should use const instead of let
    // missing ; at the end of line
    // this is using yeh.spam api key 
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
      console.log('this is in authtoken, loggedin status',loggedIn)
      return `Bearer ${token}`;
      
    } catch (error) {
      console.error("error on token", error);
    }
  }

  // using let, and not updating it
  // tokens are 'shadowing'
  // dont need to stringify, if its already a string
  // the useeffect is extra, instead could move 'if(token) up'
  // useEffect(() => {
  //   if (token) {
  //     localStorage.setItem("token", token);
  //     navigate('/petfinder')
  //   } 
  // }, [token]);

  // this checks if token is true, then stores token into local storage and redirects
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      navigate('/petfinder')
    } else {
      navigate('/')
    }
  }, [token]);
  //why didnt this throw an error before? it was trying to json parse the token
  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
    }
  }, []);
  
  const isLoggedIn = () => {
    setLoggedIn(true);
  }

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
