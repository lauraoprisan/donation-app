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
                <h3>This page is not set up yet. To be continued...</h3>
            </div>
        </div>
        <PostModal post={"the post here"} isOpen={openModal} onClose={() => setOpenModal(false)} /> {/*i have to set the post in the single post component" and actually call this postmodal from there*/}
    </section>
  )
}

export default ProfilePage
