import React from 'react'
import useNavbarScrollEffect from '../../hooks/useNavbarScrollEffect';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrolled = useNavbarScrollEffect();
  const {pathname} = useLocation()

  return (

    <>
      {pathname== "/" && (
          <nav className={`navbar-container homepage-nav ${scrolled ? 'scrolled-navbar' : ""}`}>
            <div className="left-items">
              <a href="">Cum poti actiona</a>
            </div>
            <img className="navbar-logo" src="/images/logo.png" alt="logo" />
            <div className="right-items">
                {true? (

                  <img className="avatar" src="/images/img-placeholder.jpg" alt="avatar" />

                  ):(
                  <a href="">Autentificate</a>
                  )
                 }
              <Link className="button action-button" to="/cazuri">
                Vezi toate cazurile
              </Link>
            </div>
          </nav>
      )}

      {pathname== "/cazuri" && (
         <nav className={`navbar-container ${scrolled ? 'scrolled-navbar': ""}`}>
         <div className="left-items">
           <a href="">Cum poti actiona</a>
           <a href="">Salvate</a>
           <a href="">In asteptare</a>
         </div>
         <img className="navbar-logo" src="/images/logo.png" alt="logo" />
         <div className="right-items">
          {true? (
            <img className="avatar" src="/images/img-placeholder.jpg" alt="avatar" />
          ):(
            <a href="">Autentificate</a>
          )
          }
           <Link className="button action-button" to="/cazuri">
                Vezi toate cazurile
           </Link>
         </div>
       </nav>
      )}

    </>

  )
}

export default Navbar
