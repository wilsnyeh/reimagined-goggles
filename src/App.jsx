import React, { useState } from "react";
import "./App.css";
import AuthToken from "./AuthToken";
import BreedList from "./BreedList";
import AnimalTypes from "./AnimalTypes";

function App() {
  const [token, setToken] = useState("");
  const [searchType, setSearchType] = useState("");
  const [breedList, setBreedList] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchContent, setSearchContent] = useState([]);
  const [selectedDogBreed, setSelectedDogBreed] = useState("");

  return (
    <>
      <div className="App">
        <AuthToken setToken={setToken} token={token} />
        <AnimalTypes
          setSearchType={setSearchType}
          searchType={searchType}
          selectedDogBreed={selectedDogBreed}
          setSearchLocation={setSearchLocation}
          searchLocation={searchLocation}
          token={token}
        />
        <BreedList
          setBreedList={setBreedList}
          searchType={searchType}
          token={token}
        />
      </div>
    </>
  );
}

export default App;
