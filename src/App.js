import { useState, useEffect } from "react";
import { getCharacter, getPeople } from "./api/people";
import "./App.css"


function App() {

  const[people, setPeople] = useState([])
  const [currentCharacter, setCurrentCharacter] = useState(1)
  const [details, setDetails] = useState({})
  const [errorState, setErrorState] = useState({hasError: false})
  

  useEffect(() => {
    getPeople()
    .then((data) => setPeople(data.results))
    .catch(handleError)
  }, [])

  useEffect (() => {
    getCharacter(currentCharacter).then( setDetails).catch(handleError)
  }, [currentCharacter])

  const handleError = (err) => {
    setErrorState({hasError: true, message: err.message })
  }

  const ShowDetails = (character) =>{
    const id = Number (character.url.split('/').slice(-2)[0])
    setCurrentCharacter(id)
  }
  return (

    <div>
      <ul>
      {errorState.hasError && <div> {errorState.message} </div>}
      {people.map((character) =>(
        <li key={character.name} onClick={() => ShowDetails(character)}>
          {character.name}
        </li> 
      ))}
    </ul>
    {details &&(
      <aside>
        <h1> {details.name} </h1>
        <ul>
          <li>height: {details.height} </li>
          <li>mass: {details.mass} </li>
          <li>year of birth: {details.birth_year} </li>
        </ul>
      </aside>
    )}
    </div>
  ); 
}

export default App;
