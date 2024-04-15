import { createContext, useState } from 'react';

const PostsContext = createContext({});

export const PostsProvider = ({ children }) => {
    const [contextPosts, setContextPosts] = useState([]);


    const addPost = (newPost) => {
        setContextPosts([...contextPosts, newPost]);
        console.log("contextPosts from context", contextPosts)
    };

    const editPost = (postId, updatedPost) => {
        const updatedPosts = contextPosts.map(post => {
            if (post.id === postId) {
                return { ...post, ...updatedPost };
            }
            return post;
        });
        setContextPosts(updatedPosts);
    };


    const deletePost = (postId) => {
        const updatedPosts = contextPosts.filter(post => post.id !== postId);
        setContextPosts(updatedPosts);
    };


    return (
        <PostsContext.Provider value={{
            contextPosts,
            addPost,
            editPost,
            deletePost
        }}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsContext;
