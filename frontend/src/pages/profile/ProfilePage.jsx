import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import PostModal from '../../components/modal/PostModal'

const ProfilePage = () => {
    const [openModal, setOpenModal] = useState(false)  /**i should use this in the single post component */


  return (
    <section className="profile-section">
        <div className="content-container">
        <h1 className="title">Cazurile tale</h1>
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
        <PostModal post={"the post here"} isOpen={openModal} onClose={() => setOpenModal(false)} /> {/*i have to set the post in the single post component" and actually call this postmodal from there*/}
    </section>
  )
}

export default ProfilePage
