import React, { useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import { MdOutlineDescription } from 'react-icons/md'
import { FaCalendarDay, FaLocationDot } from 'react-icons/fa6'
import { BsLightningCharge } from 'react-icons/bs'
import { GiBoomerang } from 'react-icons/gi'
import { useAuthContext } from '../../hooks/useAuthContext'
import useSavePost from '../../hooks/useSavePost'
import PostsContext from '../../context/PostsContext'
import useUnsavePost from '../../hooks/useUnsavePost'
import UserPostStatusContext from '../../context/UserPostStatusContext'
import useGetStatusesOfUserId from '../../hooks/useGetStatusesOfUserId'

const PostModal = ({isOpen, onClose, post}) => {

    const { user } = useAuthContext()
    const {handleSavePost, isUpdatingSave } = useSavePost()
    const {handleUnsavePost, isUpdatingUnsave } = useUnsavePost()
    const {userPostStatuses} = useContext(UserPostStatusContext);
    const [isSaved, setIsSaved] = useState(false)

    // console.log("userPostStatuses from postmodal: ", userPostStatuses)

    useEffect(()=>{
        if (userPostStatuses){
            setIsSaved(userPostStatuses?.some(userPostStatus => userPostStatus.postId._id == post._id && userPostStatus.isSaved))
        }
    }, [userPostStatuses, isOpen])

    useEffect(()=>{
        if(isOpen){
            console.log("modal opened again")
        }
    }, [isOpen])

    const onSavePost = async()=>{
        if(isSaved){
            await handleUnsavePost(post._id)
        } else {
            await handleSavePost(post._id, post)
        }
        onClose()
    }

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
            {user && (
                <div className="modal-buttons">
                    <button className="save-post-button" onClick={onSavePost}>{isSaved ? "Elimina salvarea" : "Salveaza" }</button>
                    <button className="action-button highlight-button">Preia cazul</button>
                </div>
            )}
            {!user && (
                <p className="post-notice-for-auth">Pentru a putea salva sau prelua cazul trebuie sa te autentifici.</p>
            )}
    </section>
</Modal>
  )
}

export default PostModal
