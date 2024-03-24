import React, { useState } from 'react'
import PostModal from '../modal/PostModal';
import AdminPostModal from '../modal/AdminPostModal'
import { IoIosArrowForward } from 'react-icons/io'
import { ImHourGlass } from 'react-icons/im';
import { RiImageEditLine } from 'react-icons/ri';


const SinglePost = ({post}) => {
    const [openModal, setOpenModal] = useState(false)
    const [openAdminModal, setOpenAdminModal] = useState(false)


  return (
    <>
        <div className="single-post-container">
            <div className="img-post-container">
                <img src="/images/img-placeholder.jpg" alt="" />
                {post.tag && <button className="tag">{post.tag}</button> }
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
                <span className="location">{post.location}</span>
                <p>{post.needs}</p>
                <button className="basic-button" onClick={()=>setOpenModal(true)}>
                    <span>Vezi detalii</span>
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
        <PostModal post={post} isOpen={openModal} onClose={() => setOpenModal(false)}/>
        <AdminPostModal post={post} isOpen={openAdminModal} onClose={() => setOpenAdminModal(false)}/>
    </>

  )
}

export default SinglePost
