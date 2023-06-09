import React, { useState } from "react";
import "./App.css";
import AuthToken from "./AuthToken";
import BreedList from "./BreedList";
import AnimalTypes from "./AnimalTypes";
import AnimalTableData from "./AnimalTableData";
import AnimalTypeFetch from "./AnimalTypeFetch";
import LoginToken from "./LoginToken";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Logout } from "./Logout";
import { ReturnToLogin } from "./ReturnToLogin";
import { DetailsModal } from "./DetailsModal";
import { AnimalDetails } from "./AnimalDetails";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimalDetail, setSelectedAnimalDetail] = useState(null);


  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <AuthToken
                setToken={setToken}
                token={token}
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/petfinder"
            element={
              <>
                {token 
                // && loggedIn 
                ? (
                  <>
                    <Logout
                      token={token}
                      loggedIn={loggedIn}
                      setLoggedIn={setLoggedIn}
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
                      loggedIn={loggedIn}
                      setLoggedIn={setLoggedIn}
                    />
                    <BreedList
                      setBreedList={setBreedList}
                      searchType={searchType}
                      token={token}
                    />
                    {/* <DetailsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> */}
                    {/* <AnimalDetails searchContent={searchContent} isModalOpen={isModalOpen}/> */}
                    <AnimalTableData
                      searchContent={searchContent}
                      moreInfo={moreInfo}
                      setMoreInfo={setMoreInfo}
                      token={token}
                      setIsModalOpen={setIsModalOpen}
                      isModalOpen={isModalOpen}
                      setSelectedAnimalDetail={setSelectedAnimalDetail}
                      selectedAnimalDetail={selectedAnimalDetail}
                    />
                    
                  </>
                ) : 
                <ReturnToLogin token={token} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
                }
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
