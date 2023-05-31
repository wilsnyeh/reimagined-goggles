import React from "react";

const BreedList = ({token, setBreedList}) => {
    const searchBreeds = async (e) => {
        e.preventDefault();
        let breedSearchUrl = "https://api.petfinder.com/v2/types/dog/breeds";
        let breedSearchOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await fetch(breedSearchUrl, breedSearchOptions);
        const content = await res.json();
    
        let breedsList = [];
        let dogBreeds = content["breeds"];
        for (let i = 0; i < dogBreeds.length; i++) {
          const listOfDogBreeds = dogBreeds[i]["name"];
          breedsList.push(listOfDogBreeds);
        }
        // console.log('is this finally the breedslist?', breedsList)
        setBreedList(breedsList);
        console.log(breedsList)
      };
      return (
        <div style={{paddingBottom:50}}>
            <button
            onClick={searchBreeds}
            >get breeds</button>
        </div>
      )
    
}

export default BreedList