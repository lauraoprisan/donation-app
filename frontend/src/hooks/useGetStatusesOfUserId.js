import React, { useEffect, useState, useContext } from 'react'
import { useAuthContext } from './useAuthContext';
import UserPostStatusContext from '../context/UserPostStatusContext';
import FilterContext from '../context/FilterContext';
import * as statusTypes from '../statusTypes'


const useGetStatusesOfUserId = () => {
    const {user} = useAuthContext()
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const { addStatuses } = useContext(UserPostStatusContext);
    const { setSelectedStatus } = useContext(FilterContext);
    // console.log("getting the statuses")
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

                // console.log("json from hook: ", json)
                if (response.ok) {
                    // console.log("getting the statuses - status ok")
                    setSelectedStatus(statusTypes.SAVED) //for showing the saved one on profile reload
                    addStatuses([...json]);
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
