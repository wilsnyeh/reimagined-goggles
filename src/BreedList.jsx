import React, { useContext } from "react";
import { TokenContext } from "./TokenContext";

const BreedList = ({setBreedList, searchType}) => {
  const {token} = useContext(TokenContext)
  
    const searchBreeds = async (e) => {
        e.preventDefault();
        let breedSearchUrl = `https://api.petfinder.com/v2/types/${searchType}/breeds`;
        let breedSearchOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try{
        const res = await fetch(breedSearchUrl, breedSearchOptions);
        const content = await res.json();
        let breedsList = [];
        let breedTypes = content["breeds"];
        for (let i = 0; i < breedTypes.length; i++) {
          const listOfBreeds = breedTypes[i]["name"];
          breedsList.push(listOfBreeds);
        }
        setBreedList(breedsList);
      } catch (error) {
        console.error('this is breedlist error', error)
      }
      };
      return (
        <div className='breeds-container'>
            <button className='breeds-search-btn'
            onClick={searchBreeds}
            >get breeds</button>
        </div>
      )
}

export default BreedList