import React, { useRef, useState } from 'react'
import PostModal from '../modal/PostModal';
import AdminPostModal from '../modal/AdminPostModal'
import { IoIosArrowForward } from 'react-icons/io'
import { ImHourGlass } from 'react-icons/im';
import { RiImageEditLine } from 'react-icons/ri';
import { IoMdSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import axios from 'axios';





const SinglePost = ({post}) => {
    const [openModal, setOpenModal] = useState(false)
    const [openAdminModal, setOpenAdminModal] = useState(false)
    const imageRef = useRef(null)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageSizeError, setImageSizeError] = useState(false)
    console.log("selectedImage", selectedImage)

    const handleOpenModal = () => {
        if(true){ //auth
            setOpenAdminModal(true)
        } else{
            setOpenModal(true)
        }
    }
    // const handleImage = async (e) => {
    //     // const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

    //     // if (e.target.files[0] && e.target.files[0].size > maxSize) {
    //     //   setImageSizeError(true)
    //     // } else {
    //     //   setImageSizeError(false)
    //     //   setSelectedImage(e.target.files[0]);
    //     //   console.log(selectedImage)
    //     // }

    //     const file = e.target.files[0];
    //         if (file && file.type.startsWith("image/")) {

    //             const reader = new FileReader();

    //             reader.onloadend = () => {
    //                 setSelectedImage(reader.result);
    //             };

    //             reader.readAsDataURL(file);
    // }
    // };

    // const handleImage = async (e) => {
    //     const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

    //     setSelectedImage(URL.createObjectURL(e.target.files[0]))
    //     console.log("selectedImage",selectedImage)
    // };

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

    // const handleUpdateImage = async (e) => {
    //     e.preventDefault();

    //     const reader = new FileReader();
    //     reader.onload = async () => {
    //         const blob = await fetch(reader.result).then((res) => res.blob()); // Convert data URL to Blob
    //         const data = new FormData();
    //         data.append('id', post._id);
    //         data.append('file', blob);

    //         try {
    //             const response = await fetch('api/posts/updateImage', {
    //                 method: 'PUT',
    //                 body: data, // Use FormData for sending binary data
    //             });

    //             const json = await response.json();
    //             if (!response.ok) {
    //                 setError(json.error);
    //             } else {
    //                 setError(null);
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     reader.readAsDataURL(selectedImage); // Convert the file to data URL
    // };

    const handleUpdateImage = async(e) =>{
        e.preventDefault()

        // if (!storyId) {
        //   console.error('Invalid storyId');
        //   return;
        // }

        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('postId', post._id);

        if(!selectedImage){
          return
        }

        // axios
        //   .put(`api/posts/updateImage/`, formData)
        //   .catch(err=>{
        //     console.log(err)
        //   })

          try {
                const response = await fetch('api/posts/updateImage', {
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
                <p>{post.needs}</p>
                <button className="basic-button" onClick={handleOpenModal}>
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
