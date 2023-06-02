import { useEffect } from "react";


const AnimalTypes = ({
  token,
  searchType,
  setSearchType,
  selectedDogBreed,
  setSelectedDogBreed,
  searchLocation,
  setSearchLocation,
  breedList,
  searchContent,
  setSearchContent,
  page,
  setPage,
}) => 

{
  useEffect(() => {
    
    console.log('is this changing?')
  },[page])

  var UsaStates = require("usa-states").UsaStates;
  var usStates = new UsaStates();
  var statesAbbreviation = usStates.arrayOf("abbreviations");


  const handleSearchChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleSelectedDogBreedChange = (e) => {
    setSelectedDogBreed(e.target.value);
  };



  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    let petFinderSearchUrl = `https://api.petfinder.com/v2/animals?page=${page}`;

    petFinderSearchUrl += `&type=${searchType}`;

    if (selectedDogBreed && searchType === "Dog") {
      petFinderSearchUrl += `&breed=${selectedDogBreed}`;
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
    let pages = content['pagination']['total_pages']
    console.log('how many pages does this have?', pages)
    console.log('what page am i on? ', page)

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

      let animalsPhotoUrl = animalPhoto;
      if (animalsPhotoUrl) {
        animalsPhotoUrl = animalPhoto["small"];
      }
      let animal = {
        name: name,
        breed: animalBreed,
        breed2: secondBreed,
        city: animalCity,
        state: animalState,
        photo: animalsPhotoUrl,
        organization: organizationId,
        orgAnimalId: organizationAnimalId,
        email: organizationEmail,
      };

      animals.push(animal);
    }
    setSearchContent(animals);
  };
  const breedInput = () => {
    if (searchType === "Dog") {
      return (
        <select onChange={handleSelectedDogBreedChange}>
          <option></option>
          {breedList.map((bl) => {
            return <option>{bl}</option>;
          })}
        </select>
      );
    }
  };
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
  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="animaltypes">Choose an animal type!</label>
        <br></br>
        <select
          id="animaltypes"
          value={searchType}
          onChange={handleSearchChange}
          name="animaltypes"
        >
          {animalTypes.map((animal) => {
            return <option>{animal}</option>;
          })}
        </select>
        {breedInput()}

        <select value={searchLocation} onChange={handleLocationChange}>
          <option></option>
          {statesAbbreviation.map((abb) => {
            return <option>{abb}</option>;
          })}
        </select>
        <button type="submit">Search for an animal near you!</button>
      </form>
      {/* <p>{pages}</p> */}
      <button
        onClick={() => {
          setPage(page = page > 1 ? page - 1 : 1);
        }}
      >
        &lt;&lt;
      </button>{" "}
      <button
        onClick={() => {
          setPage(page = page + 1);
        }}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default AnimalTypes;
