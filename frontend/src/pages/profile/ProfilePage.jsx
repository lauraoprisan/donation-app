import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import PostModal from '../../components/modal/PostModal'
import { useAuthContext } from '../../hooks/useAuthContext'
import useGetAllPosts from '../../hooks/useGetAllPosts'
import SinglePost from '../../components/posts/SinglePost'
import PostsContext from '../../context/PostsContext'
import useGetStatusesOfUserId from '../../hooks/useGetStatusesOfUserId'
import UserPostStatusContext from '../../context/UserPostStatusContext'
import FilterContext from '../../context/FilterContext'
import * as statusTypes from '../../statusTypes'

const ProfilePage = () => {

    const {user} = useAuthContext()
    const {isLoadingStatus} = useGetStatusesOfUserId()
    const { userPostStatuses} = useContext(UserPostStatusContext);
    const { selectedStatus } = useContext(FilterContext);
    const [postsToShow, setPostsToShow] = useState(null)


    let message;
    switch(selectedStatus) {
      case statusTypes.SAVED: {
        message = "salvate";
        break;
      }
      case statusTypes.IN_ACTION: {
        message = "in desfasurare";
        break;
      }
      case statusTypes.IN_WAITING: {
        message = "in asteptare";
        break;
      }
      case statusTypes.IN_RECONFIRMATION: {
        message = "care necesita reconfirmare";
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

    console.log("selectedStatus: ", selectedStatus)

    useEffect(() => {
        if (!isLoadingStatus && userPostStatuses && selectedStatus) {
            const posts = userPostStatuses.filter(userPostStatus => userPostStatus[selectedStatus])
            // console.log("filtered profile posts: ", posts)
            setPostsToShow([...posts]);
        }
    }, [isLoadingStatus, userPostStatuses,selectedStatus,user]);

  return (
    <section className="profile-section">
        <div className="content-container">
        <h1 className="title">Cazurile tale</h1>
            <div className="posts-container">
                {isLoadingStatus && <span>Loading..</span>}
                    {!isLoadingStatus && postsToShow && (
                        postsToShow.map(post => (
                            <SinglePost key={post.postId._id} post={post.postId}/>
                        ))
                    )}
                    {!isLoadingStatus && postsToShow && postsToShow.length==0 && <span>Nu sunt cazuri {message}.</span>}
            </div>
        </div>
    </section>
  )
}

export default ProfilePage
