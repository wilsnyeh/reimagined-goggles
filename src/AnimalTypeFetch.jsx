import { useContext } from "react";
import { TokenContext } from "./TokenContext";

const AnimalTypeFetch = ({ setAnimalTypes}) => {
    const {token} = useContext(TokenContext)
    const fetchAnimalType = async () => {
        const animalTypeUrl = `https://api.petfinder.com/v2/types/`

        const options = {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const res = await fetch(animalTypeUrl, options);
        const content = await res.json();
        
        let typesArr = []
        for(let i = 0; i < content.types.length; i++) {
            typesArr.push(content.types[i]['name'])
        }
        setAnimalTypes(typesArr)
    }
    return (
        <button type='submit' onClick={() => {
            fetchAnimalType()
        }}>this is to test animaltype</button>
    )
}
export default AnimalTypeFetch