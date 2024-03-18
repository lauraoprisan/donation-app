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
                <h2>Mia si copiii</h2>
                <button className="modal-tag">Urgenta</button>
            </div>
            <div className="description-section">
                <MdOutlineDescription/>
                <div className="">
                    <h4>Descrierea familiei</h4> {/*here I'll use post.description and so on */}
                    <p>Vestibulum eget pharetra mi, ac scelerisque ex. Nam mollis vehicula odio, vel pharetra quam he</p>
                </div>
            </div>
            <div className="description-section">
                <FaLocationDot/>
                <div className="">
                    <h4>Locatie</h4>
                    <p>agna, efficitur et velit sit amet, auctor </p>
                </div>
            </div>
            <div className="description-section">
                <BsLightningCharge/>
                <div className="">
                    <h4>Nevoi</h4>
                    <p>ringilla leo dapibus. Nunc ipsum lorem, feugiat id sem et, dignissim maximus urna. In quis felis sed dolor rutrum vestibulum. Sed malesuada, ex id ullamcorper vehicula, odio libero condimentum lorem, ut pretium elit est et lacus. Donec commodo id ex ut varius. Quisque urna elit, posuere et fringilla non, ultrices in arcu.</p>
                </div>
            </div>
            <div className="description-section">
                <GiBoomerang/>
                <div className="">
                    <h4>Periodicitate</h4>
                    <p>magna</p>
                </div>
            </div>
            <div className="description-section">
                <FaCalendarDay/>
                <div className="">
                    <h4>Termen</h4>
                    <p>ingilla leo dapibus. Nunc ipsum lore</p>
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
