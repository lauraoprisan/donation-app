import React, { useEffect, useState, useContext } from 'react'
import PostsContext from '../context/PostsContext';

const useGetAllPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState(null);
    const { contextPosts } = useContext(PostsContext);

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);

            try {
                const response = await fetch('https://donation-app-api.vercel.app/api/posts/');
                const json = await response.json();

                if (response.ok) {
                    setPosts(json);
                }
            } catch (error) {
                // Handle error
            } finally {
                setIsLoading(false);
            }
        };

        getPosts();
    }, [contextPosts]);

    return { posts, isLoading };
};

export default useGetAllPosts;
