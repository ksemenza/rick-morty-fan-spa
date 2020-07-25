import React, { useEffect, useState } from "react";
import CharacterCard from '../Cards/CharacterCard'
import SearchForm from '../SearchForm'
import axios from 'axios'
import styled from "styled-components";

const CardsWrap = styled.div 
`
display: flex;
flex-flow: row wrap;
justify-content: space-between;
align-items: stretch;
justify-items: center;
`
const SearchWrap = styled.div 
`
padding:1.5rem;
display:flex;
justify-content:center;

input {
  padding-left:1.5rem;
  padding-right:1.5rem;
  padding-top:0.5rem;
  padding-bottom:0.5rem;
  text-align: center;
  border: 1px dashed lime;
}

`


const ButtonCta = styled.div
`
  width: 50%;
  margin: 1.5rem auto;
  font-family: 'Gaegu', cursive;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  button {
    padding: 0.5rem;
    margin: 0.25rem;
    font-family: 'Gaegu', cursive;
  }
`;

export default function CharacterList() {
  // TODO: Add useState to track data from useEffect

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(`page=1`);

  function getPage(direction) {
    const numberPattern = /\d+/g;
    let num = page.match(numberPattern);
    //console.log(num);
    (direction === "next")? num++ : num--;
  
    if (num > 25) {
      num = 1;
    }
    if (num < 1) {
      num = 25;
  }
    //console.log(num);
    setPage(`page=${num}`);  
  }

  useEffect(() => {
    // TODO: Add API Request here - must run in `useEffect`
    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
    axios.get(`https://rickandmortyapi.com/api/character/?${page}`)
    .then(res => {
      console.log(res)
      const searchQuery = res.data.results.filter(character => character.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setSearchResults(searchQuery);


    })
    .catch(err => {
      console.error('charc data', err); 
    })

  }, [searchTerm, page]);

  const handleChange = e => {
    setSearchTerm(e.target.value)
  }

  return (
    <section className="character-list">
        {/* TODO: `array.map()` over your state here! */}
        <SearchWrap>
    <SearchForm handleChange={handleChange} searchTerm={searchTerm}/>
    </SearchWrap>
    <ButtonCta>
    <button onClick={() => getPage("previous")}> Previous Page</button>
              <button onClick={() => getPage("next")}>Next Page </button>
    </ButtonCta>
  <CardsWrap>
      {searchResults.map(character => {
          console.log(character)
        return <CharacterCard 
        character={character} 
        key={character.id} 
        name={character.name} 
        gender={character.gender} 
        species={character.species} 
        origin={character.origin.name} 
        status={character.status} 
        image={character.image} 
       />

      

      })}
      </CardsWrap>
    </section>
  );
}
