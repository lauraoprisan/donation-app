import React, { useEffect, useState, useContext} from 'react'
import useGetAllPosts from '../../hooks/useGetAllPosts';
import SinglePost from '../../components/posts/SinglePost';
import FilterContext from '../../context/FilterContext';
import AllUserPostStatusContext from '../../context/AllUserPostStatusContext';
import useGetAllStatuses from '../../hooks/useGetAllStatuses';
import { useAuthContext } from '../../hooks/useAuthContext';
import PostsContext from '../../context/PostsContext';
import * as statusTypes from '../../statusTypes'
import UserPostStatusContext from '../../context/UserPostStatusContext';
import useGetStatusesOfUserId from '../../hooks/useGetStatusesOfUserId';



const Posts = () => {
    const {user} = useAuthContext()
    const {isLoading} = useGetAllPosts()
    const {posts} =useContext(PostsContext)
    const {isLoadingStatus: isLoadingAllStatuses} = useGetAllStatuses()
    const { allUserPostStatuses} = useContext(AllUserPostStatusContext);
    const [postsToShow, setPostsToShow] = useState(null)
    const { selectedTag } = useContext(FilterContext);
    const {isLoadingStatus: isLoadingUserStatus} = useGetStatusesOfUserId()
    const { userPostStatuses} = useContext(UserPostStatusContext);


    useEffect(() => {
        if (user) {
            if (!isLoading && !isLoadingAllStatuses && !isLoadingUserStatus && posts && allUserPostStatuses) {


                const postIdsToNotShow = new Set()

                // Get statuses related to the current user
                allUserPostStatuses.forEach(status => {
                    if (status.userId._id === user._id || status[statusTypes.IN_ACTION]) {
                        postIdsToNotShow.add(status.postId._id);
                    }
                });


                const filteredPosts = posts.filter(post => !postIdsToNotShow.has(post._id));


                setPostsToShow(filteredPosts)
            }
        } else {
            if (!isLoading && posts) {
                setPostsToShow(posts)
            }
        }

        if (selectedTag) {
            selectTaggedPosts(selectedTag)
        }

    }, [isLoading, isLoadingAllStatuses, isLoadingUserStatus, posts, selectedTag, allUserPostStatuses, user]);

    const selectTaggedPosts = (selectedTag) => {
        setPostsToShow(prevPostsToShow => prevPostsToShow.filter(post => post.tag === selectedTag));
    }


    return (
        <section className="cases-section">
            <div className="content-container">
                <h1 className="title">Alege cate un caz si fa cuiva viata mai frumoasa</h1>
                {isLoading && <span>Loading..</span>}

                {!isLoading && postsToShow && postsToShow.length==0 && <span>Nu sunt cazuri.</span>}
                {!isLoading && postsToShow && postsToShow.length!=0 && (
                <ul className="posts-container">


                        {postsToShow.map(post =>
                        <SinglePost key={post._id} post={post}/>)}
                </ul>
                )}

            </div>
        </section>
    )
}

export default Posts
