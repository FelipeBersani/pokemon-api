import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

const pokemonLogo = require('../../assets/pokeapi_256.png');
const menu = require('../../assets/menu.svg');

export default function Pokemon() {
  
  useEffect(() => {
    handlePokemonById();
  }, []);

  const [pokemon, setPokemon] = useState([]);
  
  let [menuOpen, setMenuOpen] = useState(false);

  function changeMenuStatus() {
    setMenuOpen(!menuOpen);
  }

  async function handlePokemonById(e) {
    const pokemonId = localStorage.getItem('idPokemon');

    await api.get(pokemonId).then(response => {
      console.log(response.data);
      setPokemon(response.data);
    });
    
  }


  return (
    <div className="container">
      <nav>
        <img className="pageLogo" src={pokemonLogo} alt="Pokemon Logo" />
        <ul>
          <li className="menu-item">Home</li>
          <li className="menu-item">Details</li>
          <li onClick={changeMenuStatus} className="menu"><img src={menu} alt="Mobile menu" /></li>
        </ul>
      </nav>
      <div className="content">
        <div className="before-after">
          <button className="before">Before #01</button>
          <button className="after">After #03</button>
        </div>
        <div className="pokemon-content">
          <div className="img-stats">
            <img src={pokemon.sprite} alt=""/>
            <div className="weight-height">
              <h2>Height: </h2>
              <h2>Weight: </h2>
            </div>
          </div>

          <div className="base-stats">
            <h1>NOME</h1>
            <div className="types">
              <h1>type1</h1>
              <h1>type2</h1>
            </div>
            <div className="stats">
              <h1>stat1</h1>
              <h1>stat2</h1>
              <h1>stat3</h1>
              <h1>stat4</h1>
              <h1>stat5</h1>
            </div>
          </div>
        </div>

        <div className="moves">
          <h1>Moves</h1>
          <div className="move">
            <h1>move1</h1>
            <h1>move2</h1>
            <h1>move3</h1>
            <h1>move4</h1>
            <h1>move5</h1>
          </div>
        </div>

      </div>
    </div>
  )
} 