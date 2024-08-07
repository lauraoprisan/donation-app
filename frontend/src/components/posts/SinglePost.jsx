import React, { useRef, useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PostModal from '../modal/PostModal';
import AdminPostModal from '../modal/AdminPostModal'
import { IoIosArrowForward } from 'react-icons/io'
import { ImHourGlass } from 'react-icons/im';
import { RiImageEditLine } from 'react-icons/ri';
import { IoMdSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { HiHand } from "react-icons/hi";
import { FaBullseye } from 'react-icons/fa6';
import { MdDeleteForever } from "react-icons/md";
import PostsContext from '../../context/PostsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import UserPostStatusContext from '../../context/UserPostStatusContext';
import FilterContext from '../../context/FilterContext';
import * as statusTypes from '../../statusTypes'
import useDeleteStatus from '../../hooks/useDeleteStatus';
import AllUserPostStatusContext from '../../context/AllUserPostStatusContext';



const SinglePost = ({post, isOnHold}) => {
    const [openModal, setOpenModal] = useState(false)
    const [openAdminModal, setOpenAdminModal] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    const imageRef = useRef(null)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageSizeError, setImageSizeError] = useState(false)
    const { deletePost,editPost } = useContext(PostsContext);
    const confirmDeleteRef = useRef(null);
    const { user } = useAuthContext()
    const {selectedStatus, setSelectedStatus} = useContext(FilterContext)
    const  {deleteStatus} = useContext(AllUserPostStatusContext);


    const {pathname} = useLocation()

    const handleOpenModal = () => {
        if(user?.isAdmin){
            setOpenAdminModal(true)
        } else{
            setOpenModal(true)
        }
    }

    const handleImage = (e) => {
        const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

        if (e.target.files[0] && e.target.files[0].size > maxSize) {
            setImageSizeError(true);
            alert("Imaginea are dimensiunea prea mare");
        } else {
            setImageSizeError(false);
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleUpdateImage = async(e) =>{
        e.preventDefault()

        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('postId', post._id);

        if(!selectedImage){
          return
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/updateImage`, {
                method: 'PUT',
                body: formData, // Use FormData for sending binary data
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                editPost(post._id, {...post, image: json.image})
                setSelectedImage('')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeletePost = async (e)=>{
        e.stopPropagation()
        const data = {
            postId:post._id
        }

        //organize this better later!
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/deletePost`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                  },
                body: JSON.stringify(data)
            });

            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                deletePost(post._id)
                setShowConfirmDelete(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/deleteAllStatusesOfPost`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                  },
                body: JSON.stringify(data)
            });

            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                deleteStatus(post._id)
                setShowConfirmDelete(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const checkClickOutside = (e)=>{
        // console.group(e.target)
        if(showConfirmDelete && !confirmDeleteRef.current?.contains(e.target) && e.target != confirmDeleteRef.current ){

            setShowConfirmDelete(false)
        }
    }


    useEffect(()=>{
        document.addEventListener('mousedown', checkClickOutside);
        return () => document.removeEventListener('mousedown', checkClickOutside);
    },[showConfirmDelete]);



    return (
        <>
            <li className="single-post-container">
                <div className="img-post-container">
                    <img src={selectedImage ? URL.createObjectURL(selectedImage) : post.image} alt=""  className={`${!user?.isAdmin && isOnHold ? `post-on-hold-img-edit` : ``}`}/>
                    {post.tag && <button className={`tag ${!user?.isAdmin && isOnHold ? `post-on-hold`: ``}`}>{post.tag}</button> }
                    {!user?.isAdmin && isOnHold && (
                        <div className="on-hold-info">
                            <HiHand/>
                        </div>
                    )}
                    {false && ( //if case in waiting for user / admin
                        <button className="case-in-waiting">
                            <ImHourGlass/>
                        </button>
                    )}
                    {pathname == "/administrare" && (
                        <>
                            <button className="delete-case" onClick={()=>setShowConfirmDelete(true)}>
                                <MdDeleteForever/>
                            </button>
                            {showConfirmDelete && (
                                <div className="confirm-delete-container" ref={confirmDeleteRef}>
                                    <p>Sigur vrei sa stergi postarea?</p>
                                    <div className="confirm-delete-buttons">
                                        <button className="confirm-del-button" onClick={handleDeletePost}>Da</button>
                                        <button className="confirm-del-button" onClick={()=>setShowConfirmDelete(false)}>Nu</button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    {user?.isAdmin && (
                        <button className="edit-image-button">
                            { selectedImage ? (
                                <>
                                    <IoMdSave onClick={handleUpdateImage}/>
                                    <MdCancel onClick={()=>setSelectedImage(null)}/>
                                </>

                            ): (
                                <RiImageEditLine onClick={()=>imageRef.current.click()}/>
                            )}
                            <input
                                type="file"
                                name="image"
                                onChange={handleImage}
                                max-size="10485760"
                                hidden
                                ref={imageRef}
                                required
                            />
                        </button>
                    )}
                </div>
                <div className={`post-info-snippet ${!user?.isAdmin && isOnHold ? `post-on-hold`: ``}`}>
                    <span className="location">{post.location}</span>
                    {post.needs?.length > 67 ? (
                        <p>{post.needs.substring(0,67)}...</p>) : (
                        <p>{post.needs}</p>
                    )}
                    <button className="basic-button see-more" onClick={handleOpenModal}>
                        <span>Vezi detalii</span>
                        <IoIosArrowForward />
                    </button>
                </div>
            </li>
            <PostModal post={post} isOpen={openModal} onClose={() => setOpenModal(false)}/>
            <AdminPostModal post={post} isOpen={openAdminModal} onClose={() => setOpenAdminModal(false)}/>
        </>

      )
    }

    export default SinglePost