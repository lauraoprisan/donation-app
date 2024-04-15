import React, { useRef, useState } from 'react'
import {useLocation } from 'react-router-dom'
import PostModal from '../modal/PostModal';
import AdminPostModal from '../modal/AdminPostModal'
import { IoIosArrowForward } from 'react-icons/io'
import { ImHourGlass } from 'react-icons/im';
import { RiImageEditLine } from 'react-icons/ri';
import { IoMdSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaBullseye } from 'react-icons/fa6';


const SinglePost = ({post}) => {
    const [openModal, setOpenModal] = useState(false)
    const [openAdminModal, setOpenAdminModal] = useState(false)
    const imageRef = useRef(null)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageSizeError, setImageSizeError] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const {pathname} = useLocation()

    //temporary hanlding for isAdmin till auth
    if(pathname == "/admin"){
        setIsAdmin(true)
    } else {
        setIsAdmin(false)
    }
    
    const handleOpenModal = () => {
        if(isAdmin){
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
            const response = await fetch('https://donation-app-api.vercel.app/api/posts/updateImage', {
                method: 'PUT',
                body: formData, // Use FormData for sending binary data
            });

            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


  return (
    <>
        <div className="single-post-container">
            <div className="img-post-container">
                <img src={selectedImage ? URL.createObjectURL(selectedImage) : post.image} alt="" />
                {post.tag && <button className="tag">{post.tag}</button> }
                {true && ( //if case in waiting for user / admin
                            <button className="case-in-waiting">
                                <ImHourGlass/>
                            </button>
                        )}
                {true && ( //if admin
                    <button className="edit-image-button">
                        { selectedImage ? (
                            <>
                                <IoMdSave onClick={handleUpdateImage}/>  {/* add a context here so when this function is called, you add a dependency to getallposts */}
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
            <div className="post-info-snippet">
                <span className="location">{post.location}</span>
                {post.needs.length > 67 ? (
                    <p>{post.needs.substring(0,67)}...</p>) : (
                    <p>{post.needs}</p>
                )}
                <button className="basic-button see-more" onClick={handleOpenModal}>
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