import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiLogOut } from "react-icons/bi";
import AllCasesSidebar from './AllCasesSidebar';
import ProfileSidebar from './ProfileSidebar';
import AdminSidebar from './AdminSidebar';



// import useLogOut from '../../hooks/useLogout';

const Sidebar = () => {
    const {pathname} = useLocation()
    // const {handleLogout,isLoggingOut} = useLogOut()

    return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-content">
                    {pathname=="/cazuri" && <AllCasesSidebar/>}
                    {pathname=="/profil" && <ProfileSidebar/>}
                    {pathname=="/admin" && <AdminSidebar/>}
                    <Link to="/" className="sidebar-subtitle log-out-container">
                        <BiLogOut color="black" size="22px" />
                        <button className="on-desktop logout-btn">Log out</button>
                    </Link>
                </div>
            </div>
        </>

    )
}

export default Sidebar
