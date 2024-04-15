import React, { useContext } from 'react';
import useNavbarScrollEffect from '../../hooks/useNavbarScrollEffect';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { BiLogIn } from "react-icons/bi";
import FilterContext from '../../context/FilterContext';


const Navbar = () => {
  const scrolled = useNavbarScrollEffect();
  const {pathname} = useLocation()
  const { setSelectedTag } = useContext(FilterContext);

  return (
    <>
          <nav className={`navbar-container ${pathname== "/" ? "homepage-nav" : "" } ${scrolled ? 'scrolled-navbar' : ""}`}>
            <div className="left-items on-desktop-nav">
              <a href="">Cum poti actiona</a>
            </div>
            <Link to="/" className="logo-link">
              <img className="navbar-logo" src="/images/logo.png" alt="logo" />
            </Link>

            <div className="right-items">
                {false? (

                  <Link to="/profil" className="user-snippet">
                    <img className="avatar" src="/images/img-placeholder.jpg" alt="avatar" />
                    <span>username</span>
                  </Link>


                  ):(
                  <a href="">
                    <div className="on-mobile-nav"><BiLogIn color="black" size="25px"/></div>
                    <span className="on-desktop-nav">Autentifica-te</span>
                  </a>
                  )
                 }
              <Link className="button action-button on-desktop-nav" to="/cazuri" onClick={()=>setSelectedTag(null)}>
                Vezi toate cazurile
              </Link>
            </div>
          </nav>
    </>

  )
}

export default Navbar
