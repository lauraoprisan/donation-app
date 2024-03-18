import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Modal from '../../components/modal/Modal'
import { MdOutlineDescription } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import { GiBoomerang } from "react-icons/gi";
import { FaCalendarDay } from "react-icons/fa";






const Cases = () => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <section className="cases-section">
            <div className="content-container">
                <h1 className="title">Alege cate un caz si fa cuiva viata mai frumoasa</h1>
                <div className="posts-container">
                    {[1, 2, 3, 4, 5, 6].map((num, index) => (
                        <div key={index} className="single-post-container">
                            <div className="img-post-container">
                                <img src="/images/img-placeholder.jpg" alt="" />
                                <button className="tag">Urgenta</button>
                            </div>
                            <div className="post-info-snippet">
                                <span className="location">Locatie</span>
                                <p>Lista scurta cu nevoi urgente</p>
                                <button className="basic-button" onClick={() => setOpenModal(true)}>
                                    <span>Vezi detalii</span>
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <section className="post-modal-content">
                        <div className="post-modal-header">
                            <h2>Mia si copiii</h2>
                            <button className="modal-tag">Urgenta</button>
                        </div>
                        <div className="description-section">
                            <MdOutlineDescription/>
                            <div className="">
                                <h4>Descrierea familiei</h4>
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
        </section>
    )
}

export default Cases
