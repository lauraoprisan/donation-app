import React, { useEffect, useState } from 'react'
import usePostStore from '../store/postStore';

const useGetAllPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState(null);
	const { savedPosts } = usePostStore();

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
    }, [savedPosts]);

    return { posts, isLoading };
};

export default useGetAllPosts;
