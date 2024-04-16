import React, { useContext, useEffect, useState } from 'react'
import useGetAllPosts from '../../hooks/useGetAllPosts'
import SinglePost from '../../components/posts/SinglePost'
import PostsContext from '../../context/PostsContext'

const AdminPage = () => {
    const { isLoading} = useGetAllPosts()
    const {posts} =useContext(PostsContext)

  return (
    <section className="admin-section">
    <div className="content-container">
    <h1 className="title">Administrare cazuri</h1>
        <div className="posts-container">
            {isLoading && <span>Loading..</span>}
            {!isLoading && posts && (
                posts.map(post => (
                    <SinglePost key={post.id} post={post}/>
                ))
            )}
            {!isLoading && posts && posts.length==0 && <span>Nu sunt cazuri.</span>}
        </div>
    </div>
</section>
  )
}

export default AdminPage
