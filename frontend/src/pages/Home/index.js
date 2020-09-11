import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import api from '../../services/api';
import cardcover from '../../assets/card-cover.png';
import pokemonNotFound from '../../assets/no-pokemon.png';
import '../../global.css';
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
    localStorage.setItem('idPokemon', 150);
  }, []);

  window.onscroll = debounce(() => {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
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
        <Link to="/"><img className="pageLogo" src={pokemonLogo} alt="Pokemon Logo"></img></Link>
        <ul>
          <li className="menu-item"><Link to="/">Home</Link></li>
          <li className="menu-item"><Link to={`/pokemon/1`}>Details</Link></li>
          <li onClick={changeMenuStatus} className="menu"><img src={menu} alt="Mobile menu" /></li>
        </ul>
      </nav>
      <div className={`sidebar ${!menuOpen ? 'is-open' : ''}`}>
        {menuOpen ? <div className="background-sidebar" /> : null}
        <div className={`container-sidebar ${!menuOpen ? 'is-inactive' : ''}`}>
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to={`/pokemon/1`}>Details</Link></li>
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
                <div className="home-pokemons-type">
                  {pokemon.types.map(type => (
                    <div key={pokemon.id+type} className="types">
                      <div className="home-pokemon-type">
                        <img src={require(`../../assets/type-${type}.png`)} alt="Pokemon type" />
                        <div key={type} className='type'>{type}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="back-link" onClick={() => {
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