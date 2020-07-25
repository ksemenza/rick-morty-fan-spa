import React from "react";
import WelcomeImg from '../assets/img/welcome-img.jpeg'
import styled from "styled-components";
import '../index.css'
const MainWrap = styled.section 
`
display:flex;
justify-content:center;
font-size:2.2rem;
padding-bottom:2.5rem;

img {
  margin-left:7.5rem;
  margin-top:0.5rem;
  margin-bottom:-55px;
  width:25rem;
  padding:2.5rem;
  border: 5px dotted lime
}

html {

}

`

export default function WelcomePage() {
  return (
    <MainWrap className="welcome-page" >
      <header>
        <h1>Welcome to the ultimate fan site!</h1>
        <img
          className="main-img"
          src={WelcomeImg}
          alt="rick"
        />
      </header>
    </MainWrap>
  );
}
