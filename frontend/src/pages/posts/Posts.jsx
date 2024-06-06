import React, { useEffect, useState, useContext} from 'react'
import useGetAllPosts from '../../hooks/useGetAllPosts';
import SinglePost from '../../components/posts/SinglePost';
import FilterContext from '../../context/FilterContext';


const Posts = () => {
    const {isLoading, posts} = useGetAllPosts()
    const [postsToShow, setPostsToShow] = useState(null)
    const { selectedTag } = useContext(FilterContext);


    const selectTaggedPosts = (selectedTag) => {
        setPostsToShow(prevPostsToShow => prevPostsToShow.filter(post => post.tag === selectedTag));
    }

    useEffect(() => {
        // updating postsToShow once posts data is fetched
        if (!isLoading && posts) {
          setPostsToShow([...posts]);
          if(selectedTag){
            selectTaggedPosts(selectedTag)
            }
        }
    }, [isLoading, posts, selectedTag]);


    return (
        <section className="cases-section">
            <div className="content-container">
                <h1 className="title">Alege cate un caz si fa cuiva viata mai frumoasa</h1>
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

export default Posts
