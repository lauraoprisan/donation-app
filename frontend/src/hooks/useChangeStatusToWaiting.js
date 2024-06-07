import React, {useState, useContext } from 'react'
import { useAuthContext } from './useAuthContext';
import UserPostStatusContext from '../context/UserPostStatusContext';

const useChangeStatusToWaiting = () => {
    const {user} = useAuthContext()
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const {userPostStatuses, editStatus } = useContext(UserPostStatusContext);
    const [error, setError] = useState(null)


    const changeStatusToWaiting = async (postId, post) => {
        setIsLoadingStatus(true);

        const currentStatus = userPostStatuses.find(userPostStatus => userPostStatus.postId._id === postId)

        if(!currentStatus){
            setError("Nu s-a gasit un status pentru acest caz salvat.")
            console.log("The status of the post has not been found")
            return
        }

        const data = {
            _id:currentStatus._id
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/changeStatusToInWaiting`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(data)

            });

            const json = await response.json();

            if (response.ok) {
                editStatus(currentStatus._id, {...json, postId:post})
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingStatus(false);
        }
    };


    return {isLoadingStatus, changeStatusToWaiting};
};

export default useChangeStatusToWaiting;
