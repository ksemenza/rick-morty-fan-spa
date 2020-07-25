import React from "react";
import {
    Link,
    Route
} from 'react-router-dom';

import WelcomePage from './WelcomePage';
import CharacterList from './Lists/CharacterList'
import LocationList from './Lists/LocationsList'
import EpisodeList from './Lists/EpisodeList'
import styled from 'styled-components'



export default function Header() {


    const HeaderWrap = styled.div `
  border: 3px groove #lime;
  display: flex;
  width:100%;
  color:#0CB0C1;
  background: black;

  a {
   text-decoration:none;
   padding:1.0rem;
   font-size: 2.4 rem;
   color: lime;
   font-family:'Architects Daughter', cursive;


  }

  nav {
    border: 2px inset black;
    display:flex;
    justify-content:space-around;
    /* background:#0CB0C1; */
    background:black;
  }

  header {
width:100%;
  font-family: 'schwifty';
  margin:0 auto;
  text-align:center;
  font-size:3.5rem;
  color: lime;
  background: #0CB0C1;
  }

  `


    return ( <
        div >
        <
        HeaderWrap >
        <
        header className = "ui centered" >
        <
        h1 className = "ui center" > Rick and Morty Fan Page < /h1> <
        nav >
        <
        Link to = '/' > Home < /Link> <
        Link to = '/characters' > Characters < /Link> <
        Link to = '/location' > Location < /Link> <
        Link to = '/episode' > Episode < /Link> <
        /nav> <
        /header> <
        /HeaderWrap> <
        Route exact path = '/'
        component = {
            WelcomePage
        }
        /> <
        Route path = '/characters'
        component = {
            CharacterList
        }
        /> <
        Route path = '/location'
        component = {
            LocationList
        }
        /> <
        Route path = '/episode'
        component = {
            EpisodeList
        }
        /> <
        /div>

    );
}