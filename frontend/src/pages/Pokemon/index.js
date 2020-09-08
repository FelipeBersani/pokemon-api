import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import '../../global.css';
import './style.css';
import pokemonNotFound from '../../assets/no-pokemon.png';

const pokemonLogo = require('../../assets/pokeapi_256.png');
const menu = require('../../assets/menu.svg');

export default function Pokemon() {

  const {id} = useParams();

  useEffect(() => {
    handlePokemonById(id);
  }, []);

  const [pokemon, setPokemon] = useState({});
  let [menuOpen, setMenuOpen] = useState(false);

  function changeMenuStatus() {
    setMenuOpen(!menuOpen);
  }

  async function handlePokemonById(e) {
    await api.get('/' + e)
      .then(res => {
        setPokemon(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="container">
      <nav>
        <Link to="/"><img className="pageLogo" src={pokemonLogo} alt="Pokemon Logo"></img></Link>
        <ul>
          <li className="menu-item"><Link to="/">Home</Link></li>
          <li className="menu-item"><Link to={`/pokemon/${localStorage.getItem('idPokemon')}`}>Details</Link></li>
          <li onClick={changeMenuStatus} className="menu"><img src={menu} alt="Mobile menu" /></li>
        </ul>
      </nav>
      {menuOpen?
      <div className="sidebar">
         <div className="background-sidebar" /> 
        <div className={`container-sidebar ${!menuOpen ? 'is-inactive' : ''}`}>
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to={`/pokemon/1`}>Details</Link></li>
          </ul>
        </div>
      </div>
      : null}

      {pokemon && pokemon.id ?
        (<div className="content">
          <div className="before-after">
            {pokemon.id > 1 ? <button className="before" onClick={() => handlePokemonById(pokemon.id-1)}> #{(pokemon.id-1).toString().padStart(3, "0")}</button> : ''}
            {pokemon.id < 892 ?<button className="after" onClick={() => handlePokemonById(pokemon.id+1)}> #{(pokemon.id+1).toString().padStart(3, "0")}</button> : ''}
          </div>
          <div className="pokemon-content">
            <div className="img-stats">
              <img src={pokemon.sprite ? pokemon.sprite: pokemonNotFound} alt="Pokemon image" />
              <div className="weight-height">
                <h2><b>Height:</b> {pokemon.height} cm</h2>
                <h2><b>Weight:</b> {pokemon.weight} kg</h2>
              </div>
            </div>

            <div className="base-stats">
              <h1>#{pokemon.id.toString().padStart(3, "0")} - {pokemon.name}</h1>
              <div className="pokemon-types">
                {pokemon.types.map(type => (
                  <div key={`${pokemon.id}-${type}`} className={`types background-${type}`}>
                    <div key={pokemon.id + type} className="pokemon-type">
                      <img src={require(`../../assets/type-${type}.png`)} alt="Pokemon type" />
                      <div key={type} className='type'>{type}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="stats">
                <label>HP</label>
                <div className="progress-bar">
                  <span className="fullbar"></span>
                  <span className="filledbar" style={{ width: `${pokemon.stats.hp}` / 2 + '%' }}></span>
                  <span className="stat-value">{pokemon.stats.hp}</span>
                </div>
                <label>Attack</label>
                <div className="progress-bar">
                  <span className="fullbar"></span>
                  <span className="filledbar" style={{ width: `${pokemon.stats.attack}` / 2 + '%' }}></span>
                  <span className="stat-value">{pokemon.stats.attack}</span>
                </div>
                <label>Defense</label>
                <div className="progress-bar">
                  <span className="fullbar"></span>
                  <span className="filledbar" style={{ width: `${pokemon.stats.defense}` / 2 + '%' }}></span>
                  <span className="stat-value">{pokemon.stats.defense}</span>
                </div>
                <label>Special attack</label>
                <div className="progress-bar">
                  <span className="fullbar"></span>
                  <span className="filledbar" style={{ width: `${pokemon.stats.special_attack}` / 2 + '%' }}></span>
                  <span className="stat-value">{pokemon.stats.special_attack}</span>
                </div>
                <label>Special defense</label>
                <div className="progress-bar">
                  <span className="fullbar"></span>
                  <span className="filledbar" style={{ width: `${pokemon.stats.special_defense}` / 2 + '%' }}></span>
                  <span className="stat-value">{pokemon.stats.special_defense}</span>
                </div>
                <label>speed</label>
                <div className="progress-bar">
                  <span className="fullbar"></span>
                  <span className="filledbar" style={{ width: `${pokemon.stats.speed}` / 2 + '%' }}></span>
                  <span className="stat-value">{pokemon.stats.speed}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="content-moves">
            <h1>Moves</h1>
            <div className="moves">
              {pokemon.moves.map(move => (
                <div key={`${pokemon.id}-${move}`} className="move">
                  <h1>{move}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>)
        : ''}
    </div>
  )
} 