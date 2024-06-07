import React, {useState, useContext } from 'react'
import { useAuthContext } from './useAuthContext';
import * as statusTypes from '../statusTypes'
import AllUserPostStatusContext from '../context/AllUserPostStatusContext';

const useChangeStatusesOnHoldExceptForUserId = () => {
    const {user} = useAuthContext()
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const {allUserPostStatuses, editStatuses } = useContext(AllUserPostStatusContext);
    const [error, setError] = useState(null)


    const changeStatusesOnHoldExceptForUserId= async (postId, userId) => {
        setIsLoadingStatus(true);

        const currentStatus = allUserPostStatuses.find(userPostStatus => userPostStatus.postId._id === postId && userPostStatus.userId._id === userId)


        if(!currentStatus){
            setError("Nu s-a gasit un status pentru acest caz salvat.")
            console.log("The status of the post has not been found")
            return
        }

        const data = {
            postId,
            userId
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/changeStatusesToOnHoldExceptForUserId`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(data)

            });

            const json = await response.json();

            // this below is commented out because it uses a previous, eronated varsion of the allUserPostStatus in the allUserPostStatus'  context.. and so when trying to change status as an admin to "in action", the update doesn't work in the end

            // if (response.ok) {
            //      await editStatuses(postId, userId, {[statusTypes.ON_HOLD]:true})
            // }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingStatus(false);
        }
    };


    return {isLoadingStatus, changeStatusesOnHoldExceptForUserId};
};

export default useChangeStatusesOnHoldExceptForUserId;
