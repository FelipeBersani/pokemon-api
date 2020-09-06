import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import cardcover from '../../assets/card-cover.png';
import './styles.css';

const pokemonLogo = require('../../assets/pokeapi_256.png');

export default function Home(startId) {
  const [pokemons, setPokemons] = useState([]);

  async function handleAllPokemons(e) {
    e.preventDefault();

    await api.get("/").then(response => {
      setPokemons(response.data);
    });
    console.log(pokemons);
  }

  return (
    <div className="container">
      <nav>
        <img className="pageLogo" src={pokemonLogo} alt="Pokemon Logo" />
        <ul>
          <li>Home</li>
          <li>Details</li>
        </ul>
      </nav>
      <button onClick={handleAllPokemons}/>
      <div className="grid-details">
        {pokemons.map(pokemon => (
          <div className="card">
            <div className="face front">
              <img src={cardcover} alt="" />
            </div>
            <div className="face back">
              <div className="card-header">
                <h1>{pokemon.name}</h1>
                <img src={pokemon.sprite} alt="Pokemon Image" />
              </div>
              <div className="card-body">
                <div className="type">{pokemon.types}</div>
                <div className="type">{pokemon.types}</div>
                <Link className="back-link" to="/:id">
                  Get more details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}