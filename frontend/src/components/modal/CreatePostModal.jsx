import React, { useEffect, useRef, useState } from 'react'
import Modal from './Modal'
import { MdOutlineDescription } from 'react-icons/md'
import { FaCalendarDay, FaLocationDot } from 'react-icons/fa6'
import { BsLightningCharge } from 'react-icons/bs'
import { GiBoomerang } from 'react-icons/gi'
import { CgSelectR } from 'react-icons/cg'
import TagOptions from './TagOptions'

const CreatePostModal = ({isOpen, onClose, post}) => {

    const [selectedTag, setSelectedTag] = useState(null)
    const [error, setError] = useState(null)
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        location:'',
        needs:'',
        personDescription:'',
        isOneTimeNeed:true,
        timeLimit:'',
        tag:null,
        image:''
    })

    const {title, location, needs, personDescription, isOneTimeNeed, timeLimit, tag, image} = formData

    useEffect(()=>{
        setFormData((prevState) => ({
            ...prevState,
            tag: selectedTag,
        }) )
    }, [selectedTag])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }) )


    }

    const handleIsOneTimeNeedChange = (e) => {
        setFormData({ ...formData, isOneTimeNeed: !isOneTimeNeed});
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(formData)
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
            console.log( json)
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
                image:''
            })
            console.log("New post added", json)
        }
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

    console.log("from create modal", selectedTag)
    console.log("post to add", formData)
    console.log(error)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <section className="post-modal-content create-post-modal">
            <form onSubmit={handleSubmit} ref={formRef} onChange={handleAutoGrowTextarea}>
                <div className="post-modal-header">
                    <input
                        type="text"
                        name="title"
                        placeholder="Titlu"
                        onChange={onChange}
                        required/>
                    <div className="modal-tag-container">
                        <TagOptions setSelectedTag={setSelectedTag}/>
                    </div>
                </div>
                {/* <img className="img-fluid img-preview" src={image ? URL.createObjectURL(image) : story.image} />
                   <input type="file" className="form-control" id="imageUpload" name="file" max-size="10485760" hidden ref={imageRef} onChange={handleImage}/>
                   <div className = "choose-image" onClick={()=>imageRef.current.click()}>
                    <span> Choose an Image</span>
                    <RiImageEditFill size="40"/>
                   </div>
                   {imageSizeError && <p className="error-message profile-error">The file size is too large! Choose something that is smaller than 10 MB</p>} */}
                <div className="form-main-content">
                    <div className="form-single-section">
                        <MdOutlineDescription/>
                        <div className="input-container">
                            <h4>Descrierea familiei</h4>
                            <textarea
                                name="personDescription"
                                onChange={onChange}
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
                                required
                            />
                        </div>
                    </div>
                   <span>{error}</span>
                    <div className="modal-buttons">
                        <button type="submit" className="action-button highlight-button create-post-btn">Adauga cazul</button>
                    </div>
                </div>
            </form>
        </section>
    </Modal>
  )
}

export default CreatePostModal
