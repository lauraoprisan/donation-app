import { createContext, useEffect, useState } from 'react';

const UserPostStatusContext = createContext({});

export const UserPostStatusProvider = ({ children }) => {
    const [userPostStatuses, setUserPostStatuses] = useState(null);


    const addStatuses = (statusesFromDatabase) => {
        setUserPostStatuses(statusesFromDatabase)
    }


    const addStatus = (statusToAdd) => {
        setUserPostStatuses(prevStatus => [statusToAdd, ...prevStatus])

    }

    const editStatus = (postId, updatedStatus) => {
        const updatedStatuses = userPostStatuses.map(userPostStatus=>{
            if(userPostStatus.postId._id === postId){
                console.log("yeah, update a status")
                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        })
        setUserPostStatuses(updatedStatuses)
        // console.log("updatedStatuses editstatus context: ", updatedStatuses)
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
