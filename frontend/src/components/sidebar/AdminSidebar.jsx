import React, { useState } from 'react'
import { FaExclamation } from 'react-icons/fa6'
import { GiCheckMark } from 'react-icons/gi'
import { ImHourGlass } from 'react-icons/im'
import { TbFiles } from "react-icons/tb";
import { PiPersonSimpleRunBold } from 'react-icons/pi'
import { TiDeleteOutline } from "react-icons/ti";
import { IoAddOutline } from "react-icons/io5";
import CreatePostModal from '../modal/CreatePostModal'


const AdminSidebar = () => {
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false)

  return (
    <>
        <button className="action-button highlight-button add-post-sidebar-btn" onClick={()=> setOpenCreatePostModal(true)}>
            <IoAddOutline/>
            <span className="on-desktop-sidebar">
                Adauga un caz
            </span>
        </button>
        {/* <form action="">
            <input type="text" placeholder='cauta dupa titlu' />
        </form> */}
        <button className="sidebar-button all-cases-icon">
            <TbFiles/>
            <span className="on-desktop-sidebar">
                Cazuri
            </span>
        </button>
        <button className="sidebar-button">
            <FaExclamation/>
            <span className="on-desktop-sidebar">
                De confirmat
            </span>
        </button>
        <button className="sidebar-button">
            <ImHourGlass/>
            <span className="on-desktop-sidebar">
                In asteptare
            </span>
        </button>
        <button className="sidebar-button">
            <PiPersonSimpleRunBold/>
            <span className="on-desktop-sidebar">
                In actiune
            </span>
        </button>
        <button className="sidebar-button">
            <TiDeleteOutline/>
            <span className="on-desktop-sidebar">
                Renuntari
            </span>
        </button>
        <button className="sidebar-button">
            <GiCheckMark/>
            <span className="on-desktop-sidebar">
                Rezolvate
            </span>
        </button>
        <CreatePostModal isOpen={openCreatePostModal} onClose={() => setOpenCreatePostModal(false)}/>

    </>
  )
}

export default AdminSidebar
