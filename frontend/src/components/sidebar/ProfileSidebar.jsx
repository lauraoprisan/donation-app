import React from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { GiCheckMark } from 'react-icons/gi'
import { ImHourGlass } from 'react-icons/im'
import { FaExclamation } from "react-icons/fa6";
import { PiPersonSimpleRunBold } from "react-icons/pi";




const ProfileSidebar = () => {
  return (
    <>
        <button className="sidebar-button">
            <FaRegHeart/>
            <span className="on-desktop">
                Salvate
            </span>
        </button>
        <button className="sidebar-button">
            <ImHourGlass/>
            <span className="on-desktop">
                In asteptare
            </span>
        </button>
        <button className="sidebar-button">
            <FaExclamation/>
            <span className="on-desktop">
                Reconfirma
            </span>
        </button>
        <button className="sidebar-button">
            <PiPersonSimpleRunBold/>
            <span className="on-desktop">
                In actiune
            </span>
        </button>
        <button className="sidebar-button">
            <GiCheckMark/>
            <span className="on-desktop">
                Completate
            </span>
        </button>
    </>
  )
}

export default ProfileSidebar
