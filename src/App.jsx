import React, { useState } from "react";
import "./App.css";
import AuthToken from "./AuthToken";
import BreedList from "./BreedList";
import AnimalTypes from "./AnimalTypes";
import AnimalTableData from "./AnimalTableData";
import AnimalTypeFetch from "./AnimalTypeFetch";

function App() {
  const [token, setToken] = useState("");
  const [searchType, setSearchType] = useState("");
  const [breedList, setBreedList] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchContent, setSearchContent] = useState([]);
  const [selectedBreedType, setSelectedBreedType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [animalTypes, setAnimalTypes] = useState([])

  return (
    <>
      <div className="App">
        <AuthToken setToken={setToken} token={token} />
        <BreedList
          setBreedList={setBreedList}
          searchType={searchType}
          token={token}
        />
        <AnimalTypes
          searchType={searchType}
          setSearchType={setSearchType}
          selectedBreedType={selectedBreedType}
          setSelectedBreedType={setSelectedBreedType}
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          breedList={breedList}
          setBreedList={setBreedList}
          token={token}
          searchContent={searchContent}
          setSearchContent={setSearchContent}
          page={page}
          setPage={setPage}
          submitted={submitted}
          setSubmitted={setSubmitted}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
        <AnimalTypeFetch token={token} setAnimalTypes={setAnimalTypes}/>
        <AnimalTableData
          searchContent={searchContent}
        />
      </div>
    </>
  );
}

export default App;
