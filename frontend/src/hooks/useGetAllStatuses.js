import React, { useEffect, useState, useContext } from 'react'
import { useAuthContext } from './useAuthContext';
import FilterContext from '../context/FilterContext';
import * as statusTypes from '../statusTypes'
import AllUserPostStatusContext from '../context/AllUserPostStatusContext';


const useGetAllStatuses = () => {
    const {user} = useAuthContext()
    const [isLoadingStatus, setIsLoadingStatus] = useState(false);
    const {addStatuses} = useContext(AllUserPostStatusContext);
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
