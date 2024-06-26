import React, { useEffect, useRef, useState, useContext } from 'react'
import Modal from './Modal'
import { MdOutlineDescription } from 'react-icons/md'
import { FaCalendarDay, FaLocationDot } from 'react-icons/fa6'
import { BsLightningCharge } from 'react-icons/bs'
import { GiBoomerang } from 'react-icons/gi'
import { CgSelectR } from 'react-icons/cg'
import PostsContext from '../../context/PostsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import * as statusTypes from '../../statusTypes'
import FilterContext from '../../context/FilterContext'
import AllUserPostStatusContext from '../../context/AllUserPostStatusContext'
import UserRequest from '../posts/UserRequest'

const AdminPostModal = ({isOpen, onClose, post}) => {

    const {user} = useAuthContext()
    const [error, setError] = useState(null)
    const formRef = useRef(null);
    const renderRequests = true //false if case is resolved or if there are no requests
    const postIsAvailable =  post
    const [activeButton, setActiveButton] = useState(false)
    const {editPost } = useContext(PostsContext);
    const { allUserPostStatuses} = useContext(AllUserPostStatusContext)
    const { selectedStatus, setSelectedStatus } = useContext(FilterContext);
    const [userRequests, setUserRequests] = useState(null)

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

    useEffect(()=>{

        const filteredUserRequests = allUserPostStatuses?.filter(userPostStatus => userPostStatus.postId._id === post._id && (userPostStatus[statusTypes.IN_WAITING] || userPostStatus[statusTypes.IN_ACTION]));


        // console.log(filteredUserRequests.slice(0,3).map(userPostStatus=>({userId: userPostStatus.userId, [statusTypes.IN_WAITING]: userPostStatus[statusTypes.IN_WAITING], [statusTypes.IN_ACTION]: userPostStatus[statusTypes.IN_ACTION]})))

        if(filteredUserRequests?.length>3){
            setUserRequests(filteredUserRequests.slice(0,3).map(userPostStatus=>({userId: userPostStatus.userId, [statusTypes.IN_WAITING]: userPostStatus[statusTypes.IN_WAITING], [statusTypes.IN_ACTION]: userPostStatus[statusTypes.IN_ACTION]})))
        } else {
            setUserRequests(filteredUserRequests?.map(userPostStatus=>({userId: userPostStatus.userId, [statusTypes.IN_WAITING]: userPostStatus[statusTypes.IN_WAITING], [statusTypes.IN_ACTION]: userPostStatus[statusTypes.IN_ACTION]})))
        }


    },[isOpen])


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
            title,
            location,
            needs,
            personDescription,
            isOneTimeNeed,
            timeLimit,
            tag,
            id: post._id
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/updatePost`, {
                method: "PUT",
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
                onClose();
                editPost(post._id, {...data})
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
            <form  ref={formRef}>
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
                        <button className={`action-button ${activeButton? "highlight-button" : "disabled-button"}`} disabled={!activeButton} onClick={handleUpdatePost}>
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
                            {userRequests && (
                                userRequests.map((userReq)=>(
                                    <UserRequest key={userReq.userId._id} userInfo={userReq} postId={post._id} onClose={onClose}/>
                                ))
                            )}
                            {/* <div className="right-column-bottom">
                                <button className={`action-button ${false ? "disabled-button": "" }`} disabled={false}>Caz rezolvat</button>
                            </div> */}
                        </div>
                    )}
                </div>

            </form>
        </section>
    </Modal>

  )
}

export default AdminPostModal
