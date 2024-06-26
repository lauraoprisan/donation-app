import React, { useContext, useEffect, useState } from 'react'
import useGetAllPosts from '../../hooks/useGetAllPosts'
import SinglePost from '../../components/posts/SinglePost'
import PostsContext from '../../context/PostsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import FilterContext from '../../context/FilterContext'
import * as statusTypes from '../../statusTypes'
import useGetAllStatuses from '../../hooks/useGetAllStatuses'
import AllUserPostStatusContext from '../../context/AllUserPostStatusContext'

const AdminPage = () => {
    const {user} = useAuthContext()
    const { isLoading} = useGetAllPosts()
    const {isLoadingStatus} = useGetAllStatuses()
    const { allUserPostStatuses} = useContext(AllUserPostStatusContext)
    const {posts} =useContext(PostsContext)
    const [postsToShow, setPostsToShow] = useState(null)
    const {selectedTag, selectedStatus, setSelectedStatus } = useContext(FilterContext);


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


useEffect(() => {
    if (!isLoading && !selectedStatus && posts){
        // if(selectedStatus){
        //     setPostsToShow([...posts].filter(post=>post.tag===selectedStatus))
        // } else {
        //     setPostsToShow([...posts])
        // }
        setPostsToShow([...posts])
    } else if( !isLoading && !isLoadingStatus && selectedStatus && allUserPostStatuses ){
        let filteredPosts
        if(selectedStatus === statusTypes.IN_WAITING){ //only show the in waiting cases that are not on hold
            filteredPosts = allUserPostStatuses.filter(userPostStatus => userPostStatus[selectedStatus] && !userPostStatus[statusTypes.ON_HOLD]);
        } else{
            filteredPosts = allUserPostStatuses.filter(userPostStatus => userPostStatus[selectedStatus]);
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

}, [isLoading, isLoadingStatus, selectedStatus, allUserPostStatuses, posts, selectedTag]);


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
