import React, { useEffect, useState } from 'react'
import useGetAllPosts from '../../hooks/useGetAllPosts';
import SinglePost from '../../components/posts/SinglePost';


const Posts = () => {
    const {posts, isLoading} = useGetAllPosts()

    return (
        <section className="cases-section">
            <div className="content-container">
                <h1 className="title">Alege cate un caz si fa cuiva viata mai frumoasa</h1>

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

export default Posts
