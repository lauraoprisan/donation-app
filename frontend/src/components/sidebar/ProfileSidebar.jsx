import React, { useContext } from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { GiCheckMark } from 'react-icons/gi'
import { ImHourGlass } from 'react-icons/im'
import { FaExclamation } from "react-icons/fa6";
import { PiPersonSimpleRunBold } from "react-icons/pi";
import * as statusTypes from '../../statusTypes'
import FilterContext from '../../context/FilterContext';
import { useAuthContext } from '../../hooks/useAuthContext';



const ProfileSidebar = () => {
    const {selectedStatus, setSelectedStatus } = useContext(FilterContext)
console.log("selected status in profile sidebar: ", selectedStatus)
    const handleSelectStatus = (e) => {

      // Check if the clicked element or its parent has the 'sidebar-button' class
    const button = e.target.closest('.sidebar-button');

    if (button) {
        const id = button.id;

        if(button.classList.contains("active-btn")){
            button.classList.remove("active-btn")
            setSelectedStatus(null)
        } else {
            document.querySelectorAll('.sidebar-button').forEach(button => {
                button.classList.remove("active-btn");
            });
            button.classList.add("active-btn")
            setSelectedStatus(id);
        }

    }
    };
  return (
    <>
        <button
            className={`sidebar-button active-btn default-selected-button`}
            id={statusTypes.SAVED}
            onClick={handleSelectStatus}
        >
            <FaRegHeart/>
            <span className="on-desktop">
                Salvate
            </span>
        </button>
        <button
            className={`sidebar-button`}
            id={statusTypes.IN_WAITING}
            onClick={handleSelectStatus}
        >
            <ImHourGlass/>
            <span className="on-desktop">
                In asteptare
            </span>
        </button>
        <button
            className={`sidebar-button`}
            id={statusTypes.IN_ACTION}
            onClick={handleSelectStatus}
        >
            <PiPersonSimpleRunBold/>
            <span className="on-desktop">
                In actiune
            </span>
        </button>
        <button
            className={`sidebar-button`}
            id={statusTypes.COMPLETED}
            onClick={handleSelectStatus}
        >
            <GiCheckMark/>
            <span className="on-desktop">
                Completate
            </span>
        </button>
    </>
  )
}

export default ProfileSidebar
