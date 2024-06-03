import { createContext, useEffect, useState } from 'react';

const UserPostStatusContext = createContext({});

export const UserPostStatusProvider = ({ children }) => {
    const [userPostStatuses, setUserPostStatuses] = useState(null);
    // const [pendingUpdates, setPendingUpdates] = useState([]);

    // useEffect(() => {
    //     if (pendingUpdates.length > 0) {
    //         const nextUpdate = pendingUpdates[0];
    //         nextUpdate();
    //         setPendingUpdates(pendingUpdates.slice(1));
    //     }
    // }, [userPostStatuses, pendingUpdates]);

    console.log(userPostStatuses)
    const addStatuses = (statusesFromDatabase) => {
        console.log("addStatuses called context status")
        setUserPostStatuses(statusesFromDatabase)
    }

    const addStatus = (statusToAdd) => {
        console.log("addStatus called context status")
        setUserPostStatuses(prevStatus => [statusToAdd, ...prevStatus])
    }

    const editStatus = (statusId, updatedStatus) => {
        console.log("editStatus called context status")
        console.log("status context: ", updatedStatus)
        setUserPostStatuses ( prevStatuses => prevStatuses.map(userPostStatus=>{
            if(userPostStatus._id === statusId){
                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        }))

    }

    const editStatuses = (postId, userId, updatedStatus) => {
        console.log("editStatuses called context status")
        console.log("userpoststatuses before editing all for onhold",userPostStatuses )
        setUserPostStatuses(prevStatuses => userPostStatuses.map(userPostStatus=>{
            if(userPostStatus.postId === postId && userPostStatus.userId !==userId ){
                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        }))
    }

    const deleteStatus = (postId) => {
        console.log("deleteStatus called context status")
        setUserPostStatuses(prevStatuses => prevStatuses.filter(userPostStatus => userPostStatus.postId._id !== postId));
    };

    const resetStatuses = ()=>{
        console.log("resetStatuses called context status")
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
