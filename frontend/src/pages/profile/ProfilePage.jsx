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
    const {isLoading} = useGetStatusesOfUserId()
    const { userPostStatuses} = useContext(UserPostStatusContext);
    const { selectedStatus } = useContext(FilterContext);
    const [postsToShow, setPostsToShow] = useState(null)

    console.log("userPostsStatuses: ", userPostStatuses)


    useEffect(() => {
        // updating postsToShow once posts data is fetched
        if (!isLoading && userPostStatuses) {
          const allPosts = userPostStatuses.map(userPostStatus => userPostStatus.postId)
          console.log(allPosts)
          setPostsToShow([...allPosts]);

        }
    }, [isLoading, userPostStatuses]);

  return (
    <section className="profile-section">
        <div className="content-container">
        <h1 className="title">Cazurile tale</h1>
            <div className="posts-container">
                {isLoading && <span>Loading..</span>}
                    {!isLoading && postsToShow && (
                        postsToShow.map(post => (
                            <SinglePost key={post._id} post={post}/>
                        ))
                    )}
                    {!isLoading && postsToShow && postsToShow.length==0 && <span>Nu sunt cazuri.</span>}
            </div>
        </div>
    </section>
  )
}

export default ProfilePage
