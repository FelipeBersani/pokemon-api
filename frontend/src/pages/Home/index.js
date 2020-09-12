import React from 'react';
import Nav from '../../components/Nav';
import Card from '../../components/Card';

import './styles.css';

export default function Home() {

  return (
    <div className="container">
      <Nav/>
      <Card/>   
    </div>
  )
}