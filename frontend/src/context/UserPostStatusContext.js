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
        setUserPostStatuses ( prevStatuses => prevStatuses.map(userPostStatus=>{
            if(userPostStatus._id === statusId){
                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        }))

    }

    // const editStatuses = (postId, userId, updatedStatus) => {
    //     console.log("editStatuses called context status")
    //     console.log("userpoststatuses before editing all for onhold",userPostStatuses )
    //     setUserPostStatuses(prevStatuses => userPostStatuses.map(userPostStatus=>{
    //         if(userPostStatus.postId === postId && userPostStatus.userId !==userId ){
    //             return {...userPostStatus, ...updatedStatus}
    //         }
    //         return userPostStatus
    //     }))
    // }

    const deleteStatus = (postId) => {
        setUserPostStatuses(prevStatuses => prevStatuses.filter(userPostStatus => userPostStatus.postId._id !== postId));
    };

    // const resetStatuses = ()=>{
    //     console.log("resetStatuses called context status")
    //     setUserPostStatuses(null)
    // }


    return (
        <UserPostStatusContext.Provider value={{
            userPostStatuses,
            addStatuses,
            addStatus,
            editStatus,
            deleteStatus,
        }}>
            {children}
        </UserPostStatusContext.Provider>
    );
};

export default UserPostStatusContext;
