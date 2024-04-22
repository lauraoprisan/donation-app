import { createContext, useEffect, useState } from 'react';

const PostsContext = createContext({});

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState(null);

    console.log(posts)
    const addPosts =  (postsFromDatabase) => {
        setPosts(postsFromDatabase)
    }


    const addPost = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const editPost = (postId, updatedPost) => {
        const updatedPosts = posts.map(post => {
            if (post._id === postId) {
                return { ...post, ...updatedPost };
            }
            return post;
        });
        setPosts(updatedPosts);
    };


    const deletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    };

    return (
        <PostsContext.Provider value={{
            posts,
            addPosts,
            addPost,
            editPost,
            deletePost
        }}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsContext;
