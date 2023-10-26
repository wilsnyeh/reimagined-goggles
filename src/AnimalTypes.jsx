import { useContext, useEffect } from "react";
import { TokenContext } from "./TokenContext";


const animalTypes = [
  "",
  "Cat",
  "Dog",
  "Bird",
  "Rabbit",
  "Horse",
  "Scales-Fins-Other",
  "Barnyard",
];

var UsaStates = require("usa-states").UsaStates;
var usStates = new UsaStates();
var statesAbbreviation = usStates.arrayOf("abbreviations");

const AnimalTypes = ({
  searchType,
  setSearchType,
  selectedBreedType,
  setSelectedBreedType,
  searchLocation,
  setSearchLocation,
  breedList,
  setBreedList,
  searchContent,
  setSearchContent,
  page,
  setPage,
  totalPages,
  setTotalPages,
  submitted,
  setSubmitted, 
  animalRows,
  setAnimalRows,

}) => 

{
  const {token} = useContext(TokenContext)
  const handleSearchChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleSelectedBreedTypeChange = (e) => {
    setSelectedBreedType(e.target.value);
  };
  // this is to rerender when pages are increased/decreased
  useEffect(() => {
    //this was causing error for its initial render
    //needed something to delay the first render
    if (!submitted) {
      return;
    }
  fetchAnimalData()
  },[page])

  // this is to reset page when breedtype is changed
  useEffect(() => {
    if (!submitted) {
      return;
    }
    setPage(1);
    // setSelectedBreedType("")
    fetchAnimalData()
  },[selectedBreedType])
  // this resets the page, breedtype, and breedlist, when searchtype is changed
  useEffect(() => {
    if (!submitted) {
      return;
    }
    setPage(1);
    setSelectedBreedType("")
    setBreedList([])
    // fetchAnimalData()
  },[searchType])

  //prevent default was also giving issues - reason for needing to move it searchsubmit into its own func
  // but still allowing to call the fetch in useeffect
  // even after moving the original searchsubmit into useeffect, and prevent default, was getting 'length' issue, along with unwanted page
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)
    fetchAnimalData();
  }

  const fetchAnimalData = async () => {
    let petFinderSearchUrl = `https://api.petfinder.com/v2/animals?page=${page}`;

    petFinderSearchUrl += `&type=${searchType}`;

    if (selectedBreedType && searchType === "Dog") {
      petFinderSearchUrl += `&breed=${selectedBreedType}`;
    }
    if (selectedBreedType && searchType === "Cat") {
      petFinderSearchUrl += `&breed=${selectedBreedType}`;
    }
    if (selectedBreedType && searchType === "Bird") {
      petFinderSearchUrl += `&breed=${selectedBreedType}`;
    }
    if (searchLocation.length > 0) {
      petFinderSearchUrl += `&location=${searchLocation}`;
    }
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    

    const res = await fetch(petFinderSearchUrl, options);
    const content = await res.json();
    let animals = [];
    let animalContent = content["animals"];
    let totalPages = content['pagination']['total_pages']
    setTotalPages(totalPages)

    for (let i = 0; i < content["animals"].length; i++) {
      const animalContentIdx = animalContent[i];
      const name = animalContent[i]["name"];
      const animalBreed = animalContentIdx["breeds"]["primary"];
      const secondBreed = animalContentIdx["breeds"]["secondary"];
      const animalCity = animalContentIdx["contact"]["address"]["city"];
      const animalState = animalContentIdx["contact"]["address"]["state"];
      const animalPhoto = animalContentIdx["primary_photo_cropped"];
      const organizationId = animalContentIdx["organization_id"];
      const organizationAnimalId = animalContentIdx["organization_animal_id"];
      const organizationEmail = animalContentIdx["contact"]["email"];
      const organizationPhone = animalContentIdx["contact"]["phone"];

      let animalsPhotoUrl = animalPhoto;
      if (animalsPhotoUrl) {
        animalsPhotoUrl = animalPhoto["small"];
      }
      let animal = {
        name: name,
        type: searchType,
        breed: animalBreed,
        breed2: secondBreed,
        city: animalCity,
        state: animalState,
        photo: animalsPhotoUrl,
        hero: animalsPhotoUrl,
        organization: organizationId,
        orgAnimalId: organizationAnimalId,
        email: organizationEmail,
        phone: organizationPhone,
      };

      animals.push(animal);
    }
    setSearchContent(animals);
  };
 
  const breedInput = () => {
    if (searchType === "Dog") {
      return (
        <select onChange={handleSelectedBreedTypeChange}>
          <option></option>
          {breedList.map((bl, i) => {
            return <option key={i}>{bl}</option>;
          })}
        </select>
      );
    }
    if (searchType === "Cat") {
      return (
        <select onChange={handleSelectedBreedTypeChange}>
          <option></option>
          {breedList.map((bl, i) => {
            return <option key={i}>{bl}</option>;
          })}
        </select>
      );
    }
    if (searchType === "Bird") {
      return (
        <select onChange={handleSelectedBreedTypeChange}>
          <option></option>
          {breedList.map((bl, i) => {
            return <option key={i}>{bl}</option>;
          })}
        </select>
      );
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label className="labeler" htmlFor="animaltypes">Choose an animal type!</label>
        <br></br>
        <select
          className="selector"
          id="animaltypes"
          value={searchType}
          onChange={handleSearchChange}
          name="animaltypes"
        >
          {animalTypes.map((animal, i) => {
            return <option key={i}>{animal}</option>;
          })}
        </select>
        {breedInput()}

        <select className='selector' value={searchLocation} onChange={handleLocationChange}>
          <option></option>
          {statesAbbreviation.map((abb, i) => {
            return <option key={i}>{abb}</option>;
          })}
        </select>
        <button type="submit">Search for an animal near you!</button>
      </form>
      {submitted && (

      <>
      <p>Page {page} of {totalPages}</p>
      <button
        onClick={() => {
          setPage(page > 1 ? page - 1 : 1);
        }}
      >
        &lt;&lt;
      </button>{" "}
      <button
        onClick={() => {
          setPage(page < totalPages ? page + 1 : totalPages);
        }}
      >
        &gt;&gt;
      </button>
      </>
      )}
    </div>
  );
};

export default AnimalTypes;
