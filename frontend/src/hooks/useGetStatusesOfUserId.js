import React, { useEffect, useState, useContext } from 'react'
import { useAuthContext } from './useAuthContext';
import UserPostStatusContext from '../context/UserPostStatusContext';


const useGetStatusesOfUserId = () => {
    const {user} = useAuthContext()
    const [isLoading, setIsLoading] = useState(false);
    const { addStatuses } = useContext(UserPostStatusContext);

    useEffect(() => {
        const getStatusesOfUserId = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/getStatusesOfUserId`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${user.token}`,
                    },
                });

                const json = await response.json();

                console.log("json from hook: ", json)
                if (response.ok) {
                    addStatuses([...json]);
                }

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        };

        getStatusesOfUserId();
    }, [user]);

    return {isLoading };
};

export default useGetStatusesOfUserId;
