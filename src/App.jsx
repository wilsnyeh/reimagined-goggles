import React, { useState } from "react";
import "./App.css";
import AuthToken from "./AuthToken";
import BreedList from "./BreedList";
import AnimalTypes from "./AnimalTypes";
import AnimalTableData from "./AnimalTableData";

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
          searchType={searchType}
          setSearchType={setSearchType}
          selectedDogBreed={selectedDogBreed}
          setSelectedDogBreed={setSelectedDogBreed}
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          breedList={breedList}
          token={token}
          searchContent={searchContent}
          setSearchContent={setSearchContent}
        />
        <BreedList
          setBreedList={setBreedList}
          searchType={searchType}
          token={token}
        />
        <AnimalTableData searchContent={searchContent}/>
      </div>
    </>
  );
}

export default App;
