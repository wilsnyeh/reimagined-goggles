import React, { useState, useContext } from "react";
import "./App.css";
import AuthToken from "./AuthToken";
import BreedList from "./BreedList";
import AnimalTypes from "./AnimalTypes";
import { Route, Routes } from "react-router-dom";
import { Logout } from "./Logout";
import { ReturnToLogin } from "./ReturnToLogin";
import { TokenContext } from "./TokenContext";
import AnimalTableDataMUI from "./AnimalTableDataMUI";
import Pages from "./Pages";
import LoadingModule from "./LoadingModule";
import IconsTesting from "./IconsTesting";


function App({ fetchAnimalData }) {
  const { token } = useContext(TokenContext);
  const [searchType, setSearchType] = useState("");
  const [breedList, setBreedList] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchContent, setSearchContent] = useState([]);
  const [selectedBreedType, setSelectedBreedType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnimalDetail, setSelectedAnimalDetail] = useState(null);
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isLoved, setIsLoved] = useState({})
  const [nothing, setNothing] = useState(true)


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
                    {/* <IconsTesting/> */}
                    <AnimalTypes
                      searchType={searchType}
                      setSearchType={setSearchType}
                      selectedBreedType={selectedBreedType}
                      setSelectedBreedType={setSelectedBreedType}
                      searchLocation={searchLocation}
                      setSearchLocation={setSearchLocation}
                      breedList={breedList}
                      setBreedList={setBreedList}
                      setSearchContent={setSearchContent}
                      page={page}
                      setPage={setPage}
                      submitted={submitted}
                      setSubmitted={setSubmitted}
                      setTotalPages={setTotalPages}
                      loggedIn={loggedIn}
                      setLoggedIn={setLoggedIn}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      setNothing={setNothing}
                      setIsLoved={setIsLoved}
                    />
                    <BreedList
                      setBreedList={setBreedList}
                      searchType={searchType}
                    />
                    {/* <LoadingModule/> */}
                    <Pages
                      page={page}
                      setPage={setPage}
                      totalPages={totalPages}
                      submitted={submitted}
                      isLoading={isLoading}
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
                      isLoading={isLoading}
                      nothing={nothing}
                      isLoved={isLoved}
                      setIsLoved={setIsLoved}
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
