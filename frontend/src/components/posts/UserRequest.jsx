import React from 'react'
import useChangeStatusToAction from '../../hooks/useChangeStatusToAction'
import useChangeStatusesOnHoldExceptForUserId from '../../hooks/useChangeStatusesOnHoldExceptForUserId'

const UserRequest = ({userInfo, postId, onClose}) => {
    const {changeStatusToAction} = useChangeStatusToAction()
    const {changeStatusesOnHoldExceptForUserId} = useChangeStatusesOnHoldExceptForUserId()
    console.log("userInfo: ", userInfo)

    const handleAcceptRequest = async () => {
        await changeStatusToAction(postId, userInfo._id)
        await changeStatusesOnHoldExceptForUserId(postId, userInfo._id)
        onClose()
    }

  return (
    <div className="user-request">
        <span>
            {userInfo.username}
        </span>
        <div className='decision-buttons-container'>
            <button className="" onClick={handleAcceptRequest}>Accepta</button>
            <button className="">Refuza</button>
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
