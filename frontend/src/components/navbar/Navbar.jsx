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


const Navbar = () => {
  const scrolled = useNavbarScrollEffect();
  const {pathname} = useLocation()
  const { setSelectedTag } = useContext(FilterContext);
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const [showOptionalNav, setShowOptionalNav] = useState(false);

  const renderGoToPostsButton = !user || !user?.isAdmin || user?.isAdmin && pathname== "/"
  const renderAdminLink = user?.isAdmin && pathname!="/administrare"
  const renderProfileLink = !user?.isAdmin && pathname!="/profil"

  const handleLogout = () => {
    logout()
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
                        <CgProfile size="25px"/>
                    ): (
                        <BiLogIn size="25px"/>
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
                              {renderAdminLink && (
                              <Link to="/administrare">
                                  <button className="on-desktop-nav">
                                  Administrare
                                </button>
                              </Link>
                              )
                              }
                             {renderProfileLink && (
                              <Link to="/profil">
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
                  <>
                    <div className="on-mobile-nav">
                      <BiLogOut size="26px"/>
                    </div>
                  </>

                 )}
                 {renderGoToPostsButton&&(
                    <Link className="button action-button on-desktop-nav" to="/cazuri" onClick={()=>setSelectedTag(null)}>
                      Vezi toate cazurile
                    </Link>
                 )}
            </div>
          </nav>
    </>

  )
}

export default Navbar
