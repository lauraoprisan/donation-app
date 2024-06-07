import { createContext, useEffect, useState } from 'react';

const AllUserPostStatusContext = createContext({});

export const AllUserPostStatusProvider = ({ children }) => {
    const [allUserPostStatuses, setAllUserPostStatuses] = useState(null);

    const addStatuses = (statusesFromDatabase) => {

        setAllUserPostStatuses(statusesFromDatabase)
    }

    const addStatus = (statusToAdd) => {

        setAllUserPostStatuses(prevStatus => [statusToAdd, ...prevStatus])
    }

    const editStatus = (statusId, updatedStatus) => {

        setAllUserPostStatuses ( prevStatuses => prevStatuses.map(userPostStatus=>{
            if(userPostStatus._id === statusId){

                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        }))

    }

    const editStatuses = (postId, userId, updatedStatus) => {

        setAllUserPostStatuses(prevStatuses => allUserPostStatuses.map(userPostStatus=>{
            if(userPostStatus.postId === postId && userPostStatus.userId !==userId ){
                return {...userPostStatus, ...updatedStatus}
            }
            return userPostStatus
        }))
    }

    const deleteStatus = (postId) => {

        setAllUserPostStatuses(prevStatuses => prevStatuses.filter(userPostStatus => userPostStatus.postId._id !== postId));
    };



    return (
        <AllUserPostStatusContext.Provider value={{
            allUserPostStatuses,
            addStatuses,
            editStatus,
            deleteStatus,
            editStatuses,
            addStatus
        }}>
            {children}
        </AllUserPostStatusContext.Provider>
    );
};

export default AllUserPostStatusContext;
