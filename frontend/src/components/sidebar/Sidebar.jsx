import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiLogOut } from "react-icons/bi";
import AllCasesSidebar from './AllCasesSidebar';
import ProfileSidebar from './ProfileSidebar';
import AdminSidebar from './AdminSidebar';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext';


const Sidebar = () => {
    const {pathname} = useLocation()
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const renderGeneralSidebar = pathname=="/cazuri" && !user?.isAdmin
    const renderProfileSidebar = pathname=="/profil" && user && !user?.isAdmin
    const renderAdminSidebar = user?.isAdmin

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-content">
                    {renderGeneralSidebar && <AllCasesSidebar/>}
                    {renderProfileSidebar && <ProfileSidebar/>}
                    {renderAdminSidebar && <AdminSidebar/>}
                    {user && (
                        <Link to="/" className="sidebar-subtitle log-out-container" onClick={handleLogout}>
                            <BiLogOut color="black" size="22px" />
                            <button className="on-desktop-sidebar logout-btn" >Log out</button>
                        </Link>
                    )}

                </div>
            </div>
        </>

    )
}

export default Sidebar
