import React, { useEffect } from "react";

const AuthToken = ({token, setToken}) => {

    async function userAuth() {
        let petFinderUrl = 'https://api.petfinder.com/v2/oauth2/token'
        let options = {
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
        
    }

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