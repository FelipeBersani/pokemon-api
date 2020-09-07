import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';

import api from '../../services/api';
import cardcover from '../../assets/card-cover.png';
import pokemonNotFound from '../../assets/no-pokemon2.png';
import './styles.css';

const pokemonLogo = require('../../assets/pokeapi_256.png');
const menu = require('../../assets/menu.svg');

export default function Home() {
  const [pokemonsList, setPokemons] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const history = useHistory();
  let [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    handleAllPokemons(0);
  }, []);

  window.onscroll = debounce(() => {

    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      handleAllPokemons(lastKey);
    }
  }, 10);

  function changeMenuStatus() {
    setMenuOpen(!menuOpen);
  }

  async function handleAllPokemons(e) {
    await api.get('/all', {
      params: {
        startId: e
      }
    }).then(response => {
      setLastKey(response.data.lastKey);
      if(e>1000){
        let i=0;
        while(i<8){
          pokemonsList.pop();
          i++;
        }
      }
      setPokemons(pokemonsList.concat(response.data.pokemons));
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
      <div className="sidebar">
        {menuOpen ? <div className="background-sidebar" /> : null}
        <div className={`container-sidebar ${!menuOpen ? 'is-inactive' : ''}`}>
          <ul>
            <li>Home</li>
            <li>Details</li>
          </ul>
        </div>
      </div>
      <div className="grid-details">
        {pokemonsList.map(pokemon => (
          <div key={pokemon.id} className="card">

            <div className={`face back background-${pokemon.types[0]}`}>
              <div className="card-header">
                <h1>#{pokemon.id.toString().padStart(3, "0")} {pokemon.name}</h1>
                <img src={pokemon.sprite ? pokemon.sprite: pokemonNotFound} alt="Pokemon Image" />
              </div>

              <div className="card-body">
                <div className="pokemons-type">
                  {pokemon.types.map(type => (
                    <div key={pokemon.id+type} className="pokemon-type">
                      <img src={require(`../../assets/type-${type}.png`)} alt="Pokemon type" />
                      <div key={type} className='type'>{type}</div>
                    </div>
                  ))}
                </div>
                <button className="back-link" onClick={() => {
                  localStorage.setItem('idPokemon', pokemon.id);
                  history.push('/pokemon/' + pokemon.id)
                }}>
                  Get more details
                </button>
              </div>
            </div>

            <div className="face front">
              <img src={cardcover} alt="Pokemon card cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}