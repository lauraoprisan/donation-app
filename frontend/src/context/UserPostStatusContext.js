import { createContext, useEffect, useState } from 'react';

const UserPostStatusContext = createContext({});

export const UserPostStatusProvider = ({ children }) => {
    const [userPostStatuses, setUserPostStatuses] = useState(null);

useEffect(()=>{
    setUserPostStatuses(null)
},[])
    const addStatuses = (statusesFromDatabase) => {
        setUserPostStatuses(statusesFromDatabase)
    }


    const addStatus = (statusToAdd) => {
        setUserPostStatuses(prevStatus => [statusToAdd, ...prevStatus])

    }

    const editStatus = (statusId, updatedStatus) => {

        const updatedStatuses = userPostStatuses.map(userPostStatus=>{
            console.log("userPostStatus._id: ", userPostStatus._id)
            console.log("statusId: ", statusId)
            if(userPostStatus._id === statusId){
                console.log("status match in context, attempt to update to waiting")
                return {...userPostStatus, ...updatedStatus}

            }
            console.log("updated the status")
            return userPostStatus
        })
        setUserPostStatuses(updatedStatuses)
        console.log("updated statuses: ", updatedStatuses)
    }

    const deleteStatus = (postId) => {
        setUserPostStatuses(prevStatuses => prevStatuses.filter(userPostStatus => userPostStatus.postId._id !== postId));
    };

    console.log("userPostStatuses from the context: ", userPostStatuses)


    return (
        <UserPostStatusContext.Provider value={{
            userPostStatuses,
            addStatuses,
            addStatus,
            editStatus,
            deleteStatus
        }}>
            {children}
        </UserPostStatusContext.Provider>
    );
};

export default UserPostStatusContext;
