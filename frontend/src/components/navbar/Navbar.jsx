import React from 'react'
import useNavbarScrollEffect from '../../hooks/useNavbarScrollEffect';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrolled = useNavbarScrollEffect();
  const {pathname} = useLocation()

  return (
    <>
          <nav className={`navbar-container ${pathname== "/" ? "homepage-nav" : "" } ${scrolled ? 'scrolled-navbar' : ""}`}>
            <div className="left-items">
              <a href="">Cum poti actiona</a>
            </div>
            <Link to="/" className="logo-link">
              <img className="navbar-logo" src="/images/logo.png" alt="logo" />
            </Link>

            <div className="right-items">
                {true? (

                  <Link to="/profil" className="user-snippet">
                    <img className="avatar" src="/images/img-placeholder.jpg" alt="avatar" />
                    <span>username</span>
                  </Link>


                  ):(
                  <a href="">Autentificate</a>
                  )
                 }
              <Link className="button action-button" to="/cazuri">
                Vezi toate cazurile
              </Link>
            </div>
          </nav>
    </>

  )
}

export default Navbar
