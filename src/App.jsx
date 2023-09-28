import React, { useState, useAuth, useContext } from "react";
import "./App.css";
import AuthToken from "./AuthToken";
import BreedList from "./BreedList";
import AnimalTypes from "./AnimalTypes";
import AnimalTableData from "./AnimalTableData";
import AnimalTypeFetch from "./AnimalTypeFetch";
import { Route, Routes } from "react-router-dom";
import { Logout } from "./Logout";
import { ReturnToLogin } from "./ReturnToLogin";
import { TokenContext, TokenProvider } from "./TokenContext";
import AnimalTableDataMUI from "./AnimalTableDataMUI";

function App() {
  const { token, setToken } = useContext(TokenContext);
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
  const [newName, setNewName] = useState('')


  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <AuthToken setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
            }
          />
          <Route
            path="/petfinder"
            element={
              <>
                {token ? (
                  <>
                    <Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                    <AnimalTypes
                      searchType={searchType}
                      setSearchType={setSearchType}
                      selectedBreedType={selectedBreedType}
                      setSelectedBreedType={setSelectedBreedType}
                      searchLocation={searchLocation}
                      setSearchLocation={setSearchLocation}
                      breedList={breedList}
                      setBreedList={setBreedList}
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
                    />
                    <AnimalTableDataMUI
                      searchContent={searchContent}
                      setSearchContent={setSearchContent}
                      setIsModalOpen={setIsModalOpen}
                      isModalOpen={isModalOpen}
                      setSelectedAnimalDetail={setSelectedAnimalDetail}
                      selectedAnimalDetail={selectedAnimalDetail}
                      newName={newName} 
                      setNewName={setNewName}
                    />
                  </>
                ) : (
                  <ReturnToLogin
                    setLoggedIn={setLoggedIn}
                    loggedIn={loggedIn}
                  />
                )}
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
