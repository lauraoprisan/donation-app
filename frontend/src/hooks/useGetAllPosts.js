import React, { useEffect, useState, useContext } from 'react'
import PostsContext from '../context/PostsContext';


const useGetAllPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { posts, addPosts } = useContext(PostsContext);

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/`);
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
    }, []);

    return {isLoading, posts };
};

export default useGetAllPosts;
