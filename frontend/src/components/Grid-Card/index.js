import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';

import api from '../../services/api';

import cardcover from '../../assets/card-cover.png';
import pokemonNotFound from '../../assets/no-pokemon.png';

import './styles.css';

export default function Card(){
  
  const history = useHistory();

  const [pokemonsList, setPokemons] = useState([]);
  const [lastKey, setLastKey] = useState(null);

  useEffect(() => {
    handleAllPokemons(0);
  }, []);

  window.onscroll = debounce(async () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      await handleAllPokemons(lastKey);
    }
  }, 100);

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
  
  return(
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
  )
}