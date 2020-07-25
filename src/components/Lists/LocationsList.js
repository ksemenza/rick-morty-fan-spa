import React, { useEffect, useState } from "react";
import LocationCard from "../Cards/LocationCard";
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
`;

const ButtonCta = styled.div
`
  width: 50%;
  margin: 1.5rem auto;
  font-family:'Gaegu', cursive;
  display: flex;
  flex-flow: row nowrap;
  justify-content:center;
  button {
    padding: 0.5rem;
    margin: 0.25rem;
    font-family: 'Gaegu', cursive;
  
  }
    `

export default function LocationsList() {
  const [searchTermLoc, setSearchTermLoc] = useState("");
  const [searchResultsLoc, setSearchResultsLoc] = useState([]);
  const [page, setPage] = useState(`page=1`);

function getPage(direction) {
  const numberPattern = /\d+/g;
  let num = page.match(numberPattern);
  //console.log(num);
  (direction === "next")? num++ : num--;

  if (num > 4) {
    num = 1;
  }
  if (num < 1) {
    num = 4;
}
  //console.log(num);
  setPage(`page=${num}`);  
}


  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location/?${page}`)
      .then(res => {
        console.log(res.data.results);
        const searchQuery = res.data.results.filter(location =>
          location.name.toLowerCase().includes(searchTermLoc.toLowerCase())
        );
        setSearchResultsLoc(searchQuery);
      })
      .catch(err => {
        console.error("loc data", err);
      });
  }, [searchTermLoc, page]);

  const handleChange = e => {
    setSearchTermLoc(e.target.value);
  };

  return (
    <section className="character-list">
      <SearchWrap>
        <SearchForm handleChange={handleChange} searchTerm={searchTermLoc} />
      </SearchWrap>

      <ButtonCta>
        <button onClick={() => getPage("previous")}> Previous Page</button>
        <button onClick={() => getPage("next")}>Next Page </button>
      </ButtonCta>

      <CardsWrap>
        {searchResultsLoc.map(location => {
          return (
            <LocationCard
              location={location}
              key={location.key}
              name={location.name}
              type={location.type}
              dimension={location.dimension}
              created={location.created}
              residents={location.residents}
            />
          );
        })}
      </CardsWrap>
    </section>
  );
}
