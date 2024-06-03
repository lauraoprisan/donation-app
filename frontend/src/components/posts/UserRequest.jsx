import React from 'react'
import useChangeStatusToAction from '../../hooks/useChangeStatusToAction'
import useChangeStatusesOnHoldExceptForUserId from '../../hooks/useChangeStatusesOnHoldExceptForUserId'
import UserPostStatusContext from '../../context/UserPostStatusContext'

const UserRequest = ({userInfo, postId, onClose}) => {
    const {changeStatusToAction} = useChangeStatusToAction()
    const {changeStatusesOnHoldExceptForUserId} = useChangeStatusesOnHoldExceptForUserId()
    console.log("userInfo - userid: ", userInfo.userId._id)
    console.log("test - postid", postId)

    const handleAcceptRequest = async (e) => {
        e.preventDefault()
        await changeStatusToAction(postId, userInfo.userId._id)
        await changeStatusesOnHoldExceptForUserId(postId, userInfo.userId._id)
        onClose()
    }


  return (
    <div className="user-request">
        <span>
            {userInfo.userId.username}
        </span>
        <div className='decision-buttons-container'>
            {userInfo.isInAction && (
                <>
                    <span>In actiune</span>
                    <button className="" disabled>Anuleaza</button>
                </>

            ) }
            {!userInfo.isInAction && (
                <>
                    <button className="" onClick={handleAcceptRequest}>Accepta</button>
                    <button className="" disabled>Refuza</button>
                </>
            )}

        </div>
        {false && (
            <div>
                <span>
                    In actiune
                </span>
            </div>
        )}
    </div>
  )
}

export default UserRequest
