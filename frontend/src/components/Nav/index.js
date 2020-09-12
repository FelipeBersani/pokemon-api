import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../global.css';
import './styles.css';

const pokemonLogo = require('../../assets/pokeapi_256.png');
const menu = require('../../assets/menu.svg');

export default function Nav(){

  let [menuOpen, setMenuOpen] = useState(false);

  function changeMenuStatus() {
    setMenuOpen(!menuOpen);
  }

  return(
    <div>
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
    </div>

  )
}