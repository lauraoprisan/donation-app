import React from 'react'
import Modal from './Modal'
import { MdOutlineDescription } from 'react-icons/md'
import { FaCalendarDay, FaLocationDot } from 'react-icons/fa6'
import { BsLightningCharge } from 'react-icons/bs'
import { GiBoomerang } from 'react-icons/gi'
import { CgSelectR } from "react-icons/cg";


const AdminPostModal = ({isOpen, onClose, post}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <section className="post-modal-content admin-modal">
            <div className="post-modal-header">
                <h2>Mia si copiii</h2>
                <div className="modal-tag-container">
                    <button className="modal-tag">
                        Urgenta
                    </button>
                    <CgSelectR/>
                </div>
            </div>
            <div className="main-modal-content">
                <div className="left-column-content">
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
                            <p>ringilla leo dapibus. Nunc ipsum lorem, feugiat id sem et, dignisslorem, feugiat id sem et, dignissim maximus urna. In quis fg </p>
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
                    {true ? ( //do not show if case is solved
                        <div className="modal-buttons">
                        <button className={`action-button ${true? "highlight-button" : "disabled-button"}`} disabled={true}>Salveaza modificarile</button>
                    </div>
                    ):(
                        <p className="solved-case-p">Cazul a fost rezolvat de username</p>
                    )}

                </div>
                {true &&( //do not shoe if case is solved
                <div className="right-column-content">
                <h4>Cereri de preluare</h4>
                {/* put this div below into a component */}
                {[1, 2, 3,].map((num, index) => (
                <div key={index} className="user-request">
                    <span>
                        username
                    </span>
                    <div className='decision-buttons-container'>
                        <button className="">Accepta</button>
                        <button className="">Refuza</button>
                    </div>
                    {false && (
                        <div>
                            <span>
                                Asteptare reconfirmare
                            </span>
                        </div>
                    )}
                    {false && (
                        <div>
                            <span>
                                In actiune
                            </span>
                        </div>
                    )}
                </div>
                ))}
                {/* put this div above into a component */}

                <div className="right-column-bottom">
                    <div>
                        {/* Legenda */}
                    </div>
                    <button className={`action-button ${false ? "disabled-button": "" }`} disabled={false}>Caz rezolvat</button>
                </div>
            </div>
                )}

            </div>
    </section>
</Modal>
  )
}

export default AdminPostModal
