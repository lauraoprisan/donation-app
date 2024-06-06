import { createContext, useEffect, useState } from 'react';

const AllUserPostStatusContext = createContext({});

export const AllUserPostStatusProvider = ({ children }) => {
    const [allUserPostStatuses, setAllUserPostStatuses] = useState(null);

    const addStatuses = (statusesFromDatabase) => {
        console.log("addStatuses called context status")
        setAllUserPostStatuses(statusesFromDatabase)
    }

    // const addStatus = (statusToAdd) => {
    //     console.log("addStatus called context status")
    //     setAllUserPostStatuses(prevStatus => [statusToAdd, ...prevStatus])
    // }

    const editStatus = (statusId, updatedStatus) => {
        console.log("editStatus called context status")
        console.log("status context: ", updatedStatus)
        setAllUserPostStatuses ( prevStatuses => prevStatuses.map(userPostStatus=>{
            if(userPostStatus._id === statusId){
                console.log(userPostStatus)
                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        }))

    }

    const editStatuses = (postId, userId, updatedStatus) => {
        console.log("editStatuses called context status")
        setAllUserPostStatuses(prevStatuses => allUserPostStatuses.map(userPostStatus=>{
            if(userPostStatus.postId === postId && userPostStatus.userId !==userId ){
                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        }))
    }

    const deleteStatus = (postId) => {
        console.log("deleteStatus called context status")
        setAllUserPostStatuses(prevStatuses => prevStatuses.filter(userPostStatus => userPostStatus.postId._id !== postId));
    };

    // const resetStatuses = ()=>{
    //     console.log("resetStatuses called context status")
    //     setUserPostStatuses(null)
    // }

    console.log("userPostStatuses", allUserPostStatuses)

    return (
        <AllUserPostStatusContext.Provider value={{
            allUserPostStatuses,
            addStatuses,
            editStatus,
            deleteStatus,
            editStatuses
        }}>
            {children}
        </AllUserPostStatusContext.Provider>
    );
};

export default AllUserPostStatusContext;
