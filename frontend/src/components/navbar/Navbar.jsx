import React, { useContext, useState } from 'react';
import useNavbarScrollEffect from '../../hooks/useNavbarScrollEffect';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import FilterContext from '../../context/FilterContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import * as statusTypes from '../../statusTypes'


const Navbar = () => {
  const scrolled = useNavbarScrollEffect();
  const {pathname} = useLocation()
  const { setSelectedTag , setSelectedStatus} = useContext(FilterContext);
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const [showOptionalNav, setShowOptionalNav] = useState(false);

  const renderGoToPostsButton = !user || !user?.isAdmin || user?.isAdmin && pathname== "/"
  const renderAdminOptionalLink = user?.isAdmin && pathname!="/administrare"
  const renderProfileOptionalLink = !user?.isAdmin && pathname!="/profil"

  const handleLogout = () => {
    logout()
  }

  const resetSelections = ()=>{
    setSelectedTag(null)
    setSelectedStatus(null)
  }

  //set first posts to be seen in profile and admin page

  const setDefaultPosts = ()=> {
    if(!user?.isAdmin){
      setSelectedStatus(statusTypes.SAVED)
    }
  }


  return (
    <>
          <nav className={`navbar-container ${pathname== "/" ? "homepage-nav" : "" } ${scrolled ? 'scrolled-navbar' : ""}`}>
            <div className="left-items on-desktop-nav">
              <span className="link-placeholder">Cum poti actiona</span>
            </div>
            <Link to="/" className="logo-link">
              <img className="navbar-logo" src="/images/logo.png" alt="logo" />
            </Link>

            <div className="right-items">
                  <div className="on-mobile-nav">
                    {user ? (
                      <Link to={user?.isAdmin ? "/administrare" : "/profil"} className="mobile-nav-link" onClick={setDefaultPosts}>
                        <CgProfile size="25px"/>
                      </Link>

                    ): (
                      <Link to="/autentificare" className="mobile-nav-link">
                        <BiLogIn size="25px"/>
                      </Link>

                    )}

                  </div>
                  <div
                    className="on-desktop-nav"
                  >
                      {!user ? (
                        <Link to="/autentificare">
                            Autentifica-te
                        </Link>

                      ): (
                        <div
                          className="on-desktop-nav nav-username"
                          onMouseEnter={() => setShowOptionalNav(true)}
                          onMouseLeave={() => setShowOptionalNav(false)}
                          onClick={()=>setShowOptionalNav(false)}
                        >
                          <span className="nav-user-item">{user.username}</span>

                          {user && showOptionalNav && (
                            <div
                              className="desktop-log-out-container"
                              onMouseEnter={() => setShowOptionalNav(true)}

                            >
                              {renderAdminOptionalLink && (
                              <Link to="/administrare" onClick={setDefaultPosts}>
                                  <button className="on-desktop-nav">
                                  Administrare
                                </button>
                              </Link>
                              )
                              }
                             {renderProfileOptionalLink && (
                              <Link to="/profil" onClick={setDefaultPosts}>
                                  <button className="on-desktop-nav">
                                  Profil
                                </button>
                              </Link>
                              )
                              }
                              <Link to="/">
                                <button className="on-desktop-nav" onClick={handleLogout}>
                                    Log out
                                </button>
                              </Link>

                            </div>

                          )}
                        </div>
                      ) }


                  </div>


                 {user && (
                  // <Link to="/">
                  //   <div className="on-mobile-nav" onClick={handleLogout}>
                  //     <BiLogOut size="26px" />
                  //   </div>
                  // </Link>
                    <Link to="/" className="on-mobile-nav mobile-nav-link" onClick={handleLogout} >
                        <BiLogOut size="26px" />
                    </Link>

                 )}
                 {renderGoToPostsButton&&(
                    <Link className="button action-button on-desktop-nav" to="/cazuri" onClick={resetSelections}>
                      Vezi toate cazurile
                    </Link>
                 )}
            </div>
          </nav>
    </>

  )
}

export default Navbar
