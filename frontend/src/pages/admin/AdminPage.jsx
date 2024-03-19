import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { RiImageEditLine } from "react-icons/ri";
import { ImHourGlass } from 'react-icons/im'
import AdminPostModal from '../../components/modal/AdminPostModal';
import CreatePostModal from '../../components/modal/CreatePostModal';


const AdminPage = () => {

    const [openModal, setOpenModal] = useState(false)  /**i should use this in the single post component */

  return (
    <section className="admin-section">
    <div className="content-container">
    <h1 className="title">Administrare cazuri</h1>
        <div className="posts-container">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <div key={index} className="single-post-container">
                    <div className="img-post-container">
                        <img src="/images/img-placeholder.jpg" alt="" />
                        <button className="tag">Urgenta</button>
                        {true && ( //if case in waiting for user / admin
                            <button className="case-in-waiting">
                                <ImHourGlass/>
                            </button>
                        )}
                        {true && ( //if admin
                            <button className="edit-image-button">
                                <RiImageEditLine/>
                            </button>
                        )}
                    </div>
                    <div className="post-info-snippet">
                        <span className="location">Locatie</span>
                        <p>Lista scurta cu nevoi urgente</p>
                        <button className="basic-button" onClick={() => setOpenModal(true)}>
                            <span>Vezi detalii</span>
                            <IoIosArrowForward/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    <AdminPostModal post={"the post here"} isOpen={openModal} onClose={() => setOpenModal(false)} /> {/*i have to set the post in the single post component" and actually call this postmodal from there*/}
</section>
  )
}

export default AdminPage
