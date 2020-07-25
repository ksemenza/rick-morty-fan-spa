import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import axios from 'axios'

const CardDiv = styled.div
`
margin:0 auto;
  width: 30%;
  border: 2px solid black;
  border-radius: 4px;
  box-shadow: 3px 5px 3px 3px #888888;
  margin-bottom: 2rem;
  h2 {
    background: #0CB0C1;
    margin: 5px;
    padding: 1rem;
    text-align: center;
    font-family: 'Architects Daughter', cursive;

  }
  h3 {
    padding-left: 1rem;
    line-height: 1.1rem;
    font-family: 'Architects Daughter', cursive;

  }
`;

export default function LocationCard(episode) {

const [listChar, setListChar] =useState('')

  const charEsp = episode.characters
  let charList
  let people

  charEsp.map(chr => {
    // console.log(chr)
    charList = chr
    return charList
  })

  // console.log(charList)



  useEffect(() => {
    axios
      .get(charList)
      .then(res => {
        // console.log(res.data);
       setListChar=res.data
      })
      .catch(err => {
        console.error(err);
      });
  });

console.log(listChar)

  return (
    <CardDiv >
      <h2>{episode.name}</h2>
      <h3>Air Date: {episode.air_date}</h3>
      <h3>Episode: {episode.episode}</h3>
      <h3>Created: {episode.created}</h3>
      <h3>Number of Characters: {episode.characters.length}</h3>
      {/* <h3>Characters: {episode.characters}</h3> */}

    </CardDiv>
  );
}
