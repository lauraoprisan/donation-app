import React, { useContext, useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import SinglePost from '../../components/posts/SinglePost'
import useGetStatusesOfUserId from '../../hooks/useGetStatusesOfUserId'
import UserPostStatusContext from '../../context/UserPostStatusContext'
import FilterContext from '../../context/FilterContext'
import { HiHand } from "react-icons/hi";
import * as statusTypes from '../../statusTypes'

const ProfilePage = () => {

    const {user} = useAuthContext()
    const {isLoadingStatus} = useGetStatusesOfUserId()
    const { userPostStatuses} = useContext(UserPostStatusContext);
    const { selectedStatus } = useContext(FilterContext);
    const [statusesToShow, setStatusesToShow] = useState(null)
    const [existsHoldOnCase, setExistsHoldOnCase] = useState(false)



    let message;
    switch(selectedStatus) {
      case statusTypes.SAVED: {
        message = "salvate";
        break;
      }
      case statusTypes.IN_ACTION: {
        message = "in desfasurare";
        break;
      }
      case statusTypes.IN_WAITING: {
        message = "in asteptare";
        break;
      }
      case statusTypes.COMPLETED: {
        message = "completate";
        break;
      }
      default: {
        message = "selectate";
        break;
      }
    }

    // console.log("selectedStatus: ", selectedStatus)
console.log(userPostStatuses)
    useEffect(() => {
        if(!selectedStatus){
          setStatusesToShow([])
          setExistsHoldOnCase(false)
        }
        if (!isLoadingStatus && userPostStatuses && selectedStatus) {
            const filteredStatuses = userPostStatuses.filter(userPostStatus => userPostStatus[selectedStatus])
            setStatusesToShow([...filteredStatuses]);

            if(userPostStatuses.some(userPostStatus=>userPostStatus[statusTypes.ON_HOLD])){
              setExistsHoldOnCase(true)
            } else {
              setExistsHoldOnCase(false)
            }
        }
    }, [isLoadingStatus, userPostStatuses,selectedStatus,user]);

  return (
    <section className="profile-section">
        <div className="content-container">
        <h1 className="title">Cazurile tale</h1>
        {!user?.isAdmin && selectedStatus=== statusTypes.IN_WAITING && existsHoldOnCase && (
            <div className="on-hold-legend">
                <HiHand/>
                <p className="on-hold-explanation">Daca apare acest semn la un caz inseamna ca cineva se ocupa momentan. <br/>Vom reveni cu informatii daca mai este nevoie. Va multumim!</p>
            </div>
         )}
            <div className="posts-container">
                {isLoadingStatus && <span>Loading..</span>}
                {!isLoadingStatus && statusesToShow && statusesToShow.length==0 && <span>Nu sunt cazuri {message}.</span>}
                    {!isLoadingStatus && statusesToShow && (
                        statusesToShow.map(userPostStatus => (
                            <SinglePost key={userPostStatus.postId._id} post={userPostStatus.postId} isOnHold={userPostStatus[statusTypes.ON_HOLD] && userPostStatus[statusTypes.IN_WAITING]} />
                        ))
                    )}

            </div>
        </div>
    </section>
  )
}

export default ProfilePage
