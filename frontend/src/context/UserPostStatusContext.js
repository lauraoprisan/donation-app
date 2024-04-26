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

    const editStatus = (statusId, updatedStatus) => {

        const updatedStatuses = userPostStatuses.map(userPostStatus=>{
            if(userPostStatus._id === statusId){
                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        })
        setUserPostStatuses(updatedStatuses)

    }

    const editStatuses = (postId, userId, updatedStatus) => {
        const updatedStatuses = userPostStatuses.map(userPostStatus=>{
            if(userPostStatus.postId === postId && userPostStatus.userId !==userId ){
                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        })
        setUserPostStatuses(updatedStatuses)
    }

    const deleteStatus = (postId) => {
        setUserPostStatuses(prevStatuses => prevStatuses.filter(userPostStatus => userPostStatus.postId._id !== postId));
    };

    const resetStatuses = ()=>{
        setUserPostStatuses(null)
    }

    console.log("userPostStatuses: ", userPostStatuses)

    return (
        <UserPostStatusContext.Provider value={{
            userPostStatuses,
            addStatuses,
            addStatus,
            editStatus,
            deleteStatus,
            resetStatuses,
            editStatuses
        }}>
            {children}
        </UserPostStatusContext.Provider>
    );
};

export default UserPostStatusContext;
