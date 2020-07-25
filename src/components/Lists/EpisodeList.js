import React, { useEffect, useState } from "react";
import EpisodeCard from "../Cards/EpisodeCard";
import SearchForm from "../SearchForm";
import styled from "styled-components";
import axios from "axios";

const CardsWrap = styled.div
`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: stretch;
  justify-items: center;
`;
const SearchWrap = styled.div
`
  padding: 1.5rem;
  display: flex;
  justify-content: center;

  input {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
    border: 1px dashed lime;
  }
`
const ButtonCta = styled.div
` width: 50%;
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
  
`

export default function EpisodeList() {
  const [searchTermEsp, setsearchTermEsp] = useState("");
  const [searchResultsEsp, setsearchResultsEsp] = useState([]);
  const [page, setPage] = useState(`page=1`);


  function getPage(direction) {
    const numberPattern = /\d+/g;
    let num = page.match(numberPattern);
    //console.log(num);
    direction === "next" ? num++ : num--;

    if (num > 2) {
      num = 1;
    }
    if (num < 1) {
      num = 2;
    }
    //console.log(num);
    setPage(`page=${num}`);
  }



  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/?${page}`)
      .then(res => {
        console.log(res)
        const searchQuery = res.data.results.filter(episode =>
          episode.name.toLowerCase().includes(searchTermEsp.toLowerCase())
        );
        setsearchResultsEsp(searchQuery);
   
      })
      .catch(err => {
        console.error("episode data", err);
      });
  }, [searchTermEsp, page]);
  

 

  const handleChange = e => {
    setsearchTermEsp(e.target.value);
  };

  return (
    <section className="character-list">
      <SearchWrap>
        <SearchForm handleChange={handleChange} searchTerm={searchTermEsp} />
      </SearchWrap>
      <ButtonCta>
        <button onClick={() => getPage("previous")}> Previous Page</button>
        <button onClick={() => getPage("next")}>Next Page </button>
      </ButtonCta>
      <CardsWrap>
        {searchResultsEsp.map(episode => {
          return (
            <EpisodeCard 
            key={episode.id} 
            name={episode.name} 
            air_date={episode.air_date} 
            episode={episode.episode} 
            created={episode.created} 
            characters={episode.characters}/>
          );
        })}
      </CardsWrap>
    </section>
  );
}
