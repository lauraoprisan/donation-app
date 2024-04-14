import React, { useEffect, useRef, useState } from 'react'
import Modal from './Modal'
import { MdOutlineDescription } from 'react-icons/md'
import { FaCalendarDay, FaLocationDot } from 'react-icons/fa6'
import { BsLightningCharge } from 'react-icons/bs'
import { GiBoomerang } from 'react-icons/gi'
import { CgSelectR } from 'react-icons/cg'

const AdminPostModal = ({isOpen, onClose, post}) => {

    const [error, setError] = useState(null)
    const formRef = useRef(null);
    const renderRequests = false //false if case is resolved
    const postIsAvailable =  post
    const [activeButton, setActiveButton] = useState(false)

    const [formData, setFormData] = useState({
        title: postIsAvailable ? post.title : '',
        location:postIsAvailable ? post.location : '',
        needs:postIsAvailable ? post.needs : '',
        personDescription:postIsAvailable ? post.personDescription : '',
        isOneTimeNeed:postIsAvailable ? post.isOneTimeNeed : true,
        timeLimit:postIsAvailable ? post.timeLimit : '',
        tag:postIsAvailable ? post.tag : null,
        image:''
    })

    const {title, location, needs, personDescription, isOneTimeNeed, timeLimit, tag, image} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }) )

        setActiveButton(true)
    }

    const handleIsOneTimeNeedChange = (e) => {
        setFormData({ ...formData, isOneTimeNeed: !isOneTimeNeed});
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            id: post._id
        };

        try {
            const response = await fetch('api/posts/updatePost', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);

            } else {
                setError(null);
                onClose();
                setActiveButton(false)
            }
        } catch (error) {
            console.error('Error:', error);

        }
    };

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
            image:''
        })
        setActiveButton(false)
    }


    const autoGrowTextarea = () => {
        const textareas = document.querySelectorAll('textarea');

        textareas.forEach(textarea => {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        });
    };

    setTimeout(()=>{
        autoGrowTextarea()
    },0)

    useEffect(()=>{
        autoGrowTextarea();
    },[formData.personDescription, formData.needs]);



  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
        <section className="post-modal-content create-post-modal">
            <form onSubmit={handleUpdatePost} ref={formRef}>
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
                    <div className={`form-main-content  ${renderRequests ? `left-column-content` : `` }`}>
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
                    {true ? ( //do not show if case is solved
                        <div className="modal-buttons">
                        <button className={`action-button ${activeButton? "highlight-button" : "disabled-button"}`} disabled={!activeButton}>
                             Salveaza modificarile
                        </button>
                    </div>
                    ):(
                        <p className="solved-case-p">Cazul a fost rezolvat de username</p>
                    )}
                    </div>
                    {renderRequests &&( //do not show if case is solved or modal opened from sidebar to create the post
                    <div className="right-column-content">
                    <h4>Cereri de preluare</h4>
                    {/* put this div below into a component */}
                    {[1, 2, 3,].map((num, index) => (
                    <div key={index} className="user-request">
                        <span>
                            username
                        </span>
                        <div className='decision-buttons-container'>
                            <button className="">Accepta</button>
                            <button className="">Refuza</button>
                        </div>
                        {false && (
                            <div>
                                <span>
                                    Asteptare reconfirmare
                                </span>
                            </div>
                        )}
                        {false && (
                            <div>
                                <span>
                                    In actiune
                                </span>
                            </div>
                        )}
                    </div>
                    ))}
                    {/* put this div above into a component */}

                    <div className="right-column-bottom">
                        <div>
                            {/* Legenda */}
                        </div>
                        <button className={`action-button ${false ? "disabled-button": "" }`} disabled={false}>Caz rezolvat</button>
                    </div>
                </div>
                    )}
                </div>

            </form>
        </section>
    </Modal>

  )
}

export default AdminPostModal
