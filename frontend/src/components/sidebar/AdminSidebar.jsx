import React, { useContext, useEffect, useState } from 'react'
import { FaExclamation } from 'react-icons/fa6'
import { GiCheckMark } from 'react-icons/gi'
import { TbFiles } from "react-icons/tb";
import { PiPersonSimpleRunBold } from 'react-icons/pi'
import { IoAddOutline } from "react-icons/io5";
import CreatePostModal from '../modal/CreatePostModal'
import FilterContext from '../../context/FilterContext';
import * as statusTypes from '../../statusTypes'


const AdminSidebar = () => {
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false)
    const {selectedStatus, setSelectedStatus, setSelectedTag } = useContext(FilterContext)


    const handleSelectStatus = (e) => {

        // Check if the clicked element or its parent has the 'sidebar-button' class
        const button = e.target.closest('.sidebar-button');
        const defaultSelectedButton = document.querySelector(".default-selected-button")
        setSelectedTag(null)

        if (button) {
          const id = button.id;

          if(button.classList.contains("active-btn")){
              button.classList.remove("active-btn")
              defaultSelectedButton.classList.add("active-btn")
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
        <button className="action-button add-post-sidebar-btn" onClick={()=> setOpenCreatePostModal(true)}>
            <IoAddOutline/>
            <span className="on-desktop">
                Adauga un caz
            </span>
        </button>
        {/* <form action="">
            <input type="text" placeholder='cauta dupa titlu' />
        </form> */}
        <button
            className="sidebar-button all-cases-icon active-btn default-selected-button"
            onClick={handleSelectStatus}
        >
            <TbFiles/>
            <span className="on-desktop ">
                Cazuri
            </span>
        </button>
        <button
            className="sidebar-button"
            id={statusTypes.IN_WAITING}
            onClick={handleSelectStatus}
        >
            <FaExclamation/>
            <span className="on-desktop">
                De confirmat
            </span>
        </button>
        <button
            className="sidebar-button"
            id={statusTypes.IN_ACTION}
            onClick={handleSelectStatus}
        >
            <PiPersonSimpleRunBold/>
            <span className="on-desktop">
                In actiune
            </span>
        </button>
        <button
            className="sidebar-button"
            id={statusTypes.COMPLETED}
            onClick={handleSelectStatus}
        >
            <GiCheckMark/>
            <span className="on-desktop">
                Completate
            </span>
        </button>
        <CreatePostModal isOpen={openCreatePostModal} onClose={() => setOpenCreatePostModal(false)}/>

    </>
  )
}

export default AdminSidebar
