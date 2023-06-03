import React, { useEffect } from "react";

const AuthToken = ({token, setToken}) => {

    async function userAuth() {
      // should use const instead of let
      // missing ; at the end of line
      try { 
        const petFinderUrl = 'https://api.petfinder.com/v2/oauth2/token'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                grant_type: "client_credentials",
                client_id: 'cWJAoFN567mRPOc10isZZMomu17mBvGlbEyRrSZOYLJZspuR0w',
                client_secret: "N59RE4DeVfX9pCLIUBzR66nwXpxqGU0kGCbsV126",
              }),
        }
        const res = await fetch(petFinderUrl, options);
        const json = await res.json()
        let token = json.access_token 
        setToken(token)
        return `Bearer ${token}`
      } catch (error) {
        console.error('error on token', error)
      }
        
    }

    // using let, and not updating it
    // tokens are 'shadowing' 
    // dont need to stringify, if its already a string
    // the useeffect is extra, instead could move 'if(token) up' 
    useEffect(() => {
        if(token) {
          localStorage.setItem('token', JSON.stringify(token))
        }
      },[token])
    
      useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
          setToken(token)
        }
      },[])
    return (
        <div>
            <button
            type='submit'
            onClick={() => {
                userAuth();
            }}>click for token</button>
        </div>
    )
}

export default AuthToken