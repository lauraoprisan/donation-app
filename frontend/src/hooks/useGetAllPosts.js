import React, { useEffect, useState, useContext } from 'react'
import PostsContext from '../context/PostsContext';
import { useAuthContext } from './useAuthContext';


const useGetAllPosts = () => {
    const {user} = useAuthContext()
    const [isLoading, setIsLoading] = useState(false);
    const { posts, addPosts } = useContext(PostsContext);

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                });

                const json = await response.json();

                if (response.ok) {
                    addPosts([...json]);
                }

            } catch (error) {
                // Handle error
            } finally {
                setIsLoading(false);
            }
        };

        getPosts();
    }, [user]);

    return {isLoading, posts };
};

export default useGetAllPosts;
