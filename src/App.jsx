import React, { useState } from "react";
import "./App.css";
import AuthToken from "./AuthToken";
import BreedList from "./BreedList";
import AnimalTypes from "./AnimalTypes";
import AnimalTableData from "./AnimalTableData";
import AnimalTypeFetch from "./AnimalTypeFetch";
import LoginToken from "./LoginToken";
import { Route, Routes } from "react-router";

function App() {
  const [token, setToken] = useState("");
  const [searchType, setSearchType] = useState("");
  const [breedList, setBreedList] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchContent, setSearchContent] = useState([]);
  const [selectedBreedType, setSelectedBreedType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [animalTypes, setAnimalTypes] = useState([]);
  const [moreInfo, setMoreInfo] = useState(false);

  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<AuthToken setToken={setToken} token={token} />}
          />
          <Route path="/petfinder"
          element={

          <>
          {token && (
              <>
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
              <BreedList
                setBreedList={setBreedList}
                searchType={searchType}
                token={token}
              />
              <AnimalTableData
                searchContent={searchContent}
                moreInfo={moreInfo}
                setMoreInfo={setMoreInfo}
                token={token}
              />
              </>
              )}
              </>
          }
            />
        </Routes>

        {/* <AnimalTypeFetch token={token} setAnimalTypes={setAnimalTypes} /> */}
      </div>
    </>
  );
}

export default App;
