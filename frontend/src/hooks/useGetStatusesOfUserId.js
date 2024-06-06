import React, { useEffect, useState, useContext } from 'react'
import { useAuthContext } from './useAuthContext';
import UserPostStatusContext from '../context/UserPostStatusContext';
import FilterContext from '../context/FilterContext';
import * as statusTypes from '../statusTypes'


const useGetStatusesOfUserId = () => {
    const {user} = useAuthContext()
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const {resetStatuses, addStatuses } = useContext(UserPostStatusContext);
    const { setSelectedStatus } = useContext(FilterContext);

    useEffect(() => {
        const getStatusesOfUserId = async () => {
            setIsLoadingStatus(true);

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/getStatusesOfUserId`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${user.token}`,
                    },
                });

                const json = await response.json();


                if (response.ok) {
                    addStatuses([...json]);
                    setSelectedStatus(statusTypes.SAVED) //for showing the saved one on profile reload

                }

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoadingStatus(false);
            }
        };

        getStatusesOfUserId();
    }, [user]);

    return {isLoadingStatus };
};

export default useGetStatusesOfUserId;
