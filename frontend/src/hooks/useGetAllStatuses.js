import React, { useEffect, useState, useContext } from 'react'
import { useAuthContext } from './useAuthContext';
import UserPostStatusContext from '../context/UserPostStatusContext';
import FilterContext from '../context/FilterContext';
import * as statusTypes from '../statusTypes'


const useGetAllStatuses = () => {
    const {user} = useAuthContext()
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const { resetStatuses, addStatuses } = useContext(UserPostStatusContext);
    const {setSelectedStatus} = useContext(FilterContext)

    useEffect(()=>{
        const getAllStatuses = async () => {
            setIsLoadingStatus(true);

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/status/getAllStatuses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                const json = await response.json();


                if (response.ok) {
                    resetStatuses()
                    setSelectedStatus(null)
                    addStatuses([...json]);
                }

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoadingStatus(false);
            }
        };

        getAllStatuses()

    }, [user])


    return {isLoadingStatus };
};

export default useGetAllStatuses;
