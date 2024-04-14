// import React, { useEffect, useState } from 'react'
// import usePostStore from '../store/postStore';

// const useGetPostById = () => {
//     const [isLoading, setIsLoading] = useState(false);
// 	const [post, setPost] = useState(null);

//     const getPost = async (postId) => {
//         setIsLoading(true);
//         setPost(null);

//         try {
//             const response = await fetch(`/api/post/:${postId}`);
//             const json = await response.json();

//             if (response.ok) {
//                 setPost(json);
//             }
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     return { post, getPost, isLoading };
// };

// export default useGetPostById;
