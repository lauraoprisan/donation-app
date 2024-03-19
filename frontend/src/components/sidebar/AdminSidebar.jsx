import React, { useState } from 'react'
import { FaExclamation } from 'react-icons/fa6'
import { GiCheckMark } from 'react-icons/gi'
import { ImHourGlass } from 'react-icons/im'
import { PiPersonSimpleRunBold } from 'react-icons/pi'
import { TiDeleteOutline } from "react-icons/ti";
import CreatePostModal from '../modal/CreatePostModal'


const AdminSidebar = () => {
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false)

  return (
    <>
        <button className="action-button highlight-button" onClick={()=> setOpenCreatePostModal(true)}>
            Adauga un caz
        </button>
        <form action="">
            <input type="text" placeholder='cauta dupa titlu' />
        </form>
        <button className="sidebar-button">
            <FaExclamation/>
            <span className="on-desktop">
                De confirmat
            </span>
        </button>
        <button className="sidebar-button">
            <ImHourGlass/>
            <span className="on-desktop">
                In asteptare
            </span>
        </button>
        <button className="sidebar-button">
            <PiPersonSimpleRunBold/>
            <span className="on-desktop">
                In actiune
            </span>
        </button>
        <button className="sidebar-button">
            <TiDeleteOutline/>
            <span className="on-desktop">
                Renuntari
            </span>
        </button>
        <button className="sidebar-button">
            <GiCheckMark/>
            <span className="on-desktop">
                Rezolvate
            </span>
        </button>
        <CreatePostModal post={"the post here"} isOpen={openCreatePostModal} onClose={() => setOpenCreatePostModal(false)}/>
    </>
  )
}

export default AdminSidebar
