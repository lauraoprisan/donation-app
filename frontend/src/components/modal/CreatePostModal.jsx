import React from 'react'
import Modal from './Modal'
import { MdOutlineDescription } from 'react-icons/md'
import { FaCalendarDay, FaLocationDot } from 'react-icons/fa6'
import { BsLightningCharge } from 'react-icons/bs'
import { GiBoomerang } from 'react-icons/gi'
import { CgSelectR } from 'react-icons/cg'

const CreatePostModal = ({isOpen, onClose, post}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <section className="post-modal-content create-post-modal">
            <form action="">
                <div className="post-modal-header">
                    <input type="text" name="location" placeholder="Titlu"/>
                    <div className="modal-tag-container">
                        <button className="modal-tag">
                            Urgenta
                        </button>
                        <CgSelectR/>
                    </div>
                </div>

                <div className="description-section">
                    <MdOutlineDescription/>
                    <div className="">
                        <h4>Descrierea familiei</h4>
                        <textarea name="description" rows="4" cols="50" placeholder="Descrierea familiei"></textarea>
                    </div>
                </div>

                <div className="description-section">
                    <FaLocationDot/>
                    <div className="">
                        <h4>Locatie</h4>
                        <input type="text" name="location" placeholder="Locatie"/>
                    </div>
                </div>

                <div className="description-section">
                    <BsLightningCharge/>
                    <div className="">
                        <h4>Nevoi</h4>
                        <textarea name="needs" rows="4" cols="50" placeholder="Nevoi"></textarea>
                    </div>
                </div>

                <div className="description-section">
                    <GiBoomerang/>
                    <div className="">
                        <h4>Periodicitate</h4>
                        <input type="text" name="periodicity" placeholder="Periodicitate"/>
                    </div>
                </div>

                <div className="description-section">
                    <FaCalendarDay/>
                    <div className="">
                        <h4>Termen</h4>
                        <input type="text" name="term" placeholder="Termen"/>
                    </div>
                </div>

                <div className="modal-buttons">
                    <button type="submit" className="action-button highlight-button">Adauga cazul</button>
                </div>
            </form>

        </section>
    </Modal>
  )
}

export default CreatePostModal
