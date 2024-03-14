import React from 'react'
import useNavbarScrollEffect from '../../hooks/useNavbarScrollEffect';

const Navbar = () => {
  const scrolled = useNavbarScrollEffect();
  return (

    <nav className={`navbar-container ${scrolled && 'scrolled-navbar'}`}>
      <div className="left-items">
        <a href="">Cum poti actiona</a>
      </div>
      <img className="navbar-logo" src="/images/logo.png" alt="logo" />
      <div className="right-items">
        <a href="">Autentificate</a>
        <button className="action-button">Vezi toate cazurile</button>
      </div>
    </nav>
  )
}

export default Navbar
