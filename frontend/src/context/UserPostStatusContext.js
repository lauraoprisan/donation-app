import { createContext, useEffect, useState } from 'react';

const UserPostStatusContext = createContext({});

export const UserPostStatusProvider = ({ children }) => {
    const [userPostStatuses, setUserPostStatuses] = useState(null);

    const addStatuses = (statusesFromDatabase) => {
        setUserPostStatuses(statusesFromDatabase)
    }

    return (
        <UserPostStatusContext.Provider value={{
            userPostStatuses,
            addStatuses
        }}>
            {children}
        </UserPostStatusContext.Provider>
    );
};

export default UserPostStatusContext;
