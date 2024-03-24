import React, { useEffect, useState } from 'react'

const useGetAllPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState(null);

    useEffect(()=>{
        const getPosts = async () =>{
            setIsLoading(true)

        try {
            const response = await fetch('/api/posts/')
            const json = await response.json()

            if(response.ok){
                setPosts(json)
            }
        } catch (error) {

        } finally{
            setIsLoading(false)
        }
    }

        getPosts()

    },[])

    console.log(posts)
    return {posts, isLoading}
}

export default useGetAllPosts
