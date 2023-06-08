import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const AuthToken = ({ token, setToken }) => {
  async function userAuth() {
    // should use const instead of let
    // missing ; at the end of line
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

  // using let, and not updating it
  // tokens are 'shadowing'
  // dont need to stringify, if its already a string
  // the useeffect is extra, instead could move 'if(token) up'
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);
  //why didnt this throw an error before? it was trying to json parse the token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
      let path = `/petfinder`
      navigate(path);
  }
  return (
    <div>
      <input type="text" placeholder="username" />
      <br></br>
      <input type="text" placeholder="password" />
      <br></br>
      <button
        type="submit"
        onClick={() => {
          userAuth();
          routeChange();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default AuthToken;
