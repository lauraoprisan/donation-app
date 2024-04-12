import React, { useEffect, useRef, useState } from 'react'
import Modal from './Modal'
import { MdOutlineDescription } from 'react-icons/md'
import { FaCalendarDay, FaLocationDot } from 'react-icons/fa6'
import { FaImage } from "react-icons/fa";
import { BsLightningCharge } from 'react-icons/bs'
import { GiBoomerang } from 'react-icons/gi'
import { CgSelectR } from 'react-icons/cg'

const CreatePostModal = ({isOpen, onClose, post}) => {

    const [error, setError] = useState(null)
    const formRef = useRef(null);
    const imageRef = useRef(null)
    const postIsAvailable =  post
    const [activeButton, setActiveButton] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)


    const [formData, setFormData] = useState({
        title:'',
        location: '',
        needs: '',
        personDescription:'',
        isOneTimeNeed:true,
        timeLimit:'',
        tag:null,
        image:selectedImage
    })

    const {title, location, needs, personDescription, isOneTimeNeed, timeLimit, tag, image} = formData

    // useEffect(()=>{
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         tag: selectedTag,
    //     }) )
    // }, [selectedTag])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }) )

        setActiveButton(true)
    }

    const handleImage = (e)=>{
		const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {

            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData(prevState => ({
                    ...prevState,
                    image: reader.result
                }));
                setSelectedImage(reader.result);
            };

            reader.readAsDataURL(file);

        } else {
            setSelectedImage(null)
        }
    }
    const handleIsOneTimeNeedChange = (e) => {
        setFormData({ ...formData, isOneTimeNeed: !isOneTimeNeed});
    };

    const handleCreatePost = async(e) => {
        e.preventDefault()


        const response = await fetch('api/posts/addPost', {
            method: 'POST',
            body:JSON.stringify(formData),
            headers: {
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)

        } else {
            setError(null)
            onClose()
            setFormData({
                title: '',
                location:'',
                needs:'',
                personDescription:'',
                isOneTimeNeed:true,
                timeLimit:'',
                tag:null,
                image:null
            })
            setActiveButton(false)
    
        }
    }

    const handleOnClose = ()=>{
        onClose()
        setFormData({
            title: postIsAvailable ? post.title : '',
            location:postIsAvailable ? post.location : '',
            needs:postIsAvailable ? post.needs : '',
            personDescription:postIsAvailable ? post.personDescription : '',
            isOneTimeNeed:postIsAvailable ? post.isOneTimeNeed : true,
            timeLimit:postIsAvailable ? post.timeLimit : '',
            tag:postIsAvailable ? post.tag : null,
            image:null
        })
        setActiveButton(false)
    }

    function autoGrowTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

    }

    const handleAutoGrowTextarea = (e) => {
        if (e.target.tagName.toLowerCase() === 'textarea') {
            autoGrowTextarea(e.target);
        }
    };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
        <section className="post-modal-content create-post-modal">
            <form onSubmit={handleCreatePost} ref={formRef} onChange={handleAutoGrowTextarea}>
                <div className="post-modal-header">
                    <input
                        type="text"
                        name="title"
                        placeholder={!post ? "Titlu" : ""}
                        onChange={onChange}
                        required
                        value={title}
                    />
                    <div className="modal-tag-container">
                        <select className="tags-options-container" name="tag" onChange={onChange} value={tag}>
                            {/* existing tags. map trhough them */}
                            <option> </option>
                            <option value="Urgenta">Urgenta</option>
                            <option value="Dorinta">Dorinta</option>
                            {/* add position relative to */}
                        </select>
                    </div>
                </div>
                {/* <img className="img-fluid img-preview" src={image ? URL.createObjectURL(image) : story.image} />
                <input type="file" className="form-control" id="imageUpload" name="file" max-size="10485760" hidden ref={imageRef} onChange={handleImage}/>
                <div className = "choose-image" onClick={()=>imageRef.current.click()}>
                    <span> Choose an Image</span>
                    <RiImageEditFill size="40"/>
                </div>
                {imageSizeError && <p className="error-message profile-error">The file size is too large! Choose something that is smaller than 10 MB</p>} */}
                <div className="main-modal-content">
                    <div className="form-main-content">
                        <div className="form-single-section">
                            <FaImage/>
                            <div className="input-container img-input">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImage}
                                    max-size="10485760"
                                    hidden
                                    ref={imageRef}
                                    required
                                />
                                <img src={selectedImage} alt="" />
                                <button type="button" className="action-button" onClick={()=>imageRef.current.click()}>Selecteaza o imagine</button>
                            </div>
                        </div>
                        <div className="form-single-section">
                            <MdOutlineDescription/>
                            <div className="input-container">
                                <h4>Descrierea familiei</h4>
                                <textarea
                                    name="personDescription"
                                    onChange={onChange}
                                    value={personDescription}
                                    required>
                                </textarea>
                            </div>
                        </div>
                        <div className="form-single-section">
                            <FaLocationDot/>
                            <div className="input-container">
                                <h4>Locatie</h4>
                                <input
                                    type="text"
                                    name="location"
                                    onChange={onChange}
                                    value={location}
                                    required/>
                            </div>
                        </div>

                        <div className="form-single-section">
                            <BsLightningCharge/>
                            <div className="input-container">
                                <h4>Nevoi</h4>
                                <textarea
                                    name="needs"
                                    onChange={onChange}
                                    value={needs}
                                    required>
                                </textarea>
                            </div>
                        </div>

                        <div className="form-single-section">
                            <GiBoomerang/>
                            <div className="input-container">
                                <h4>Periodicitate</h4>
                                <div className="check-box-container">
                                    <label>Este nevoie constanta de ajutor?</label>
                                    <input
                                        type="checkbox"
                                        onChange={handleIsOneTimeNeedChange}
                                        checked = {!isOneTimeNeed}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-single-section">
                            <FaCalendarDay/>
                            <div className="input-container">
                                <h4>Termen</h4>
                                <input
                                    type="text"
                                    name="timeLimit"
                                    onChange={onChange}
                                    value={timeLimit}
                                    required
                                />
                            </div>
                        </div>
                    <span>{error}</span>
                        <div className="modal-buttons">
                            <button className={`action-button ${activeButton? "highlight-button" : "disabled-button"}`} disabled={!activeButton}>
                               Adauga cazul
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </Modal>

  )
}

export default CreatePostModal
