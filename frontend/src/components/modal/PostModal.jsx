import React, { useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import { MdOutlineDescription } from 'react-icons/md'
import { FaCalendarDay, FaLocationDot } from 'react-icons/fa6'
import { BsLightningCharge } from 'react-icons/bs'
import { GiBoomerang } from 'react-icons/gi'
import { useAuthContext } from '../../hooks/useAuthContext'
import useSavePost from '../../hooks/useSavePost'
import useDeleteStatus from '../../hooks/useDeleteStatus'
import UserPostStatusContext from '../../context/UserPostStatusContext'
import useChangeStatusToWaiting from '../../hooks/useChangeStatusToWaiting'
import useCreateWaitingStatus from '../../hooks/useCreateWaitingStatus'
import * as statusTypes from '../../statusTypes'

const PostModal = ({isOpen, onClose, post}) => {

    const { user } = useAuthContext()
    const {handleSavePost, isUpdatingSave } = useSavePost()
    const {handleDeleteStatus, isUpdatingDeleteStatus } = useDeleteStatus()
    const {userPostStatuses} = useContext(UserPostStatusContext);
    const [isSaved, setIsSaved] = useState(false)
    const [canAbandonCase, setCanAbandonCase] = useState(false)
    const {changeStatusToWaiting} = useChangeStatusToWaiting()
    const {handleCreateWaitingStatus} = useCreateWaitingStatus()

    useEffect(()=>{
        if (userPostStatuses){
            setIsSaved(userPostStatuses?.some(userPostStatus => userPostStatus.postId._id == post._id && userPostStatus.isSaved))
            setCanAbandonCase(userPostStatuses?.some(userPostStatus => userPostStatus.postId._id == post._id && (userPostStatus[statusTypes.IN_WAITING] || userPostStatus[statusTypes.IN_ACTION] || (userPostStatus[statusTypes.ON_HOLD] && !userPostStatus[statusTypes.SAVED]))))
        }
    }, [userPostStatuses, isOpen, user])



    const onSavePost = async()=>{
        if(isSaved){
            await handleDeleteStatus(post._id)
        } else {
            await handleSavePost(post._id, post)
        }
        onClose()
    }

    const handleReqToTakeCase = async()=>{
        if(isSaved){
           await changeStatusToWaiting(post._id, post)
        } else {

            if(canAbandonCase){
               await handleDeleteStatus(post._id)
            } else {
                await handleCreateWaitingStatus(post._id, post)
            }
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
                    {!canAbandonCase && <button className="save-post-button" onClick={onSavePost}>{isSaved ? "Elimina salvarea" : "Salveaza" }</button>}
                    <button className={`action-button ${!canAbandonCase ? "highlight-button" : ""}`} onClick={handleReqToTakeCase}>{canAbandonCase ? "Renunta la caz" : "Preia cazul"}</button>
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
