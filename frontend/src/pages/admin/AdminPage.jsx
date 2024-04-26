import React, { useContext, useEffect, useState } from 'react'
import useGetAllPosts from '../../hooks/useGetAllPosts'
import SinglePost from '../../components/posts/SinglePost'
import PostsContext from '../../context/PostsContext'
import UserPostStatusContext from '../../context/UserPostStatusContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import FilterContext from '../../context/FilterContext'
import * as statusTypes from '../../statusTypes'
import useGetAllStatuses from '../../hooks/useGetAllStatuses'

const AdminPage = () => {
    const {user} = useAuthContext()
    const { isLoading} = useGetAllPosts()
    const {isLoadingStatus} = useGetAllStatuses()
    const { userPostStatuses} = useContext(UserPostStatusContext)
    const {posts} =useContext(PostsContext)
    const { selectedStatus, setSelectedStatus } = useContext(FilterContext);
    const [postsToShow, setPostsToShow] = useState(null)
    const { selectedTag } = useContext(FilterContext);

    let message;
    switch(selectedStatus) {
      case statusTypes.IN_ACTION: {
        message = "in desfasurare";
        break;
      }
      case statusTypes.IN_WAITING: {
        message = "care necesita confirmare";
        break;
      }
      case statusTypes.COMPLETED: {
        message = "completate";
        break;
      }
      default: {
        message = null;
        break;
      }
    }

// useEffect(()=>{
//     console.log("status has changed in admin page")
//     console.log("selectedStatus", selectedStatus)
// },[selectedStatus])

useEffect(() => {
    if (!isLoading && !selectedStatus && posts){
        if(selectedTag){
            setPostsToShow([...posts].filter(post=>post.tag===selectedTag))
        } else {
            setPostsToShow([...posts])
        }

    } else if(!isLoadingStatus && selectedStatus && userPostStatuses){
        let filteredPosts
        if(selectedStatus === statusTypes.IN_WAITING){
            console.log("selected in waiting posts")
            filteredPosts = userPostStatuses.filter(userPostStatus => userPostStatus[selectedStatus] && !userPostStatus[statusTypes.ON_HOLD]);
        } else{
            filteredPosts = userPostStatuses.filter(userPostStatus => userPostStatus[selectedStatus]);
        }


        const uniquePostsSet = new Set();
        const uniquePosts = [];

        filteredPosts.forEach(obj => {
            const postId = obj.postId._id;
            if (!uniquePostsSet.has(postId)) {
                uniquePostsSet.add(postId);
                uniquePosts.push(obj);
            }
        });

        setPostsToShow([...uniquePosts]);
    }

}, [isLoading, isLoadingStatus, selectedStatus, userPostStatuses, posts, selectedTag]);

    // console.log("postsToshow in adminpage: ", postsToShow)

  return (
    <section className="admin-section">
    <div className="content-container">
    <h1 className="title">Administrare cazuri</h1>
        <div className="posts-container">
            {isLoadingStatus || isLoading && <span>Loading..</span>}
            {!isLoading && !isLoadingStatus && postsToShow?.length==0 && <span>Nu sunt cazuri {message}.</span>}
            {(!isLoading || !isLoadingStatus) && postsToShow && (
    postsToShow.map(post => (
        'isWaitingAdminResponse' in post ? (    //temporary solution because the condition with selectedStatus did not work
            <SinglePost key={post?._id} post={post.postId}/>
        ) : (
            <SinglePost key={post?._id} post={post}/>
        )
    ))
)}

        </div>
    </div>
</section>
  )
}

export default AdminPage
