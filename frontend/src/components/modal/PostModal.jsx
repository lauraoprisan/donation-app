import React from 'react'
import Modal from './Modal'
import { MdOutlineDescription } from 'react-icons/md'
import { FaCalendarDay, FaLocationDot } from 'react-icons/fa6'
import { BsLightningCharge } from 'react-icons/bs'
import { GiBoomerang } from 'react-icons/gi'

const PostModal = ({isOpen, onClose, post}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <section className="post-modal-content">
            <div className="post-modal-header">
                <h2>{post.title}</h2>
                {post.tag && <button className="modal-tag">{post.tag}</button> }
            </div>
            <div className="form-single-section">
                <MdOutlineDescription/>
                <div className="">
                    <h4>Descrierea familiei</h4>
                    <p>{post.personDescription}</p>
                </div>
            </div>
            <div className="form-single-section">
                <FaLocationDot/>
                <div className="">
                    <h4>Locatie</h4>
                    <p>{post.location}</p>
                </div>
            </div>
            <div className="form-single-section">
                <BsLightningCharge/>
                <div className="">
                    <h4>Nevoi</h4>
                    <p>{post.needs}</p>
                </div>
            </div>
            <div className="form-single-section">
                <GiBoomerang/>
                <div className="">
                    <h4>Periodicitate</h4>
                    <p>{post.isOneTimeNeed ? "Doar o data" : "Constant nevoie de ajutor"}</p>
                </div>
            </div>
            <div className="form-single-section">
                <FaCalendarDay/>
                <div className="">
                    <h4>Termen</h4>
                    <p>{post.timeLimit}</p>
                </div>
            </div>
            <div className="modal-buttons">
                <button className="action-button">Salveaza</button>
                <button className="action-button highlight-button">Preia cazul</button>
            </div>

    </section>
</Modal>
  )
}

export default PostModal
