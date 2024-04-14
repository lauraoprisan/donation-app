import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import useGetAllPosts from '../../hooks/useGetAllPosts';
import PostModal from '../../components/modal/PostModal';
import SinglePost from '../../components/posts/SinglePost';


const Homepage = () => {
    const [openModal, setOpenModal] = useState(false)  /**i should use this in the single post component */
    const {posts, isLoading} = useGetAllPosts();
    const [postsToShow, setPostsToShow] = useState([]);

    useEffect(() => {
        console.log(posts);
        if (posts) {
            console.log("posts inside if", posts);
            const filteredPosts = posts.filter(post => post.tag === "Urgenta");
            const sortedPosts = filteredPosts.sort((a, b) => a.createdAt - b.createdAt);
            const firstThreePosts = sortedPosts.slice(0,3)
            setPostsToShow(firstThreePosts);
            console.log("poststoshow", postsToShow);
        }
    }, [isLoading]);

    console.log("poststoshow",postsToShow)
  return (
    <>
        <section className="hero-section">
            <div className="hero-content">
                <h1>
                    Ofera-ti sprijinul
                    <br/>
                    oriunde este nevoie de el
                </h1>
                <Link to="/cazuri" className="button hero-button">
                    <button>
                        Gaseste strigatul de ajutor
                    </button>
                </Link>
            </div>
        </section>
        <section className="project-idea-section">
            <div className="container project-idea-content">
                <div className="left-inside-container">
                    <h2>Ideea care sta la baza acestui proiect</h2>
                    <p>
                        Prin aceasta platforma, facem cunoscute toate cazurile care apeleaza la noi, pe care le verificam, pentru a putea ajunge ajutorul la orice om care il cere.
                    </p>
                    <p>
                        Poti sa te ocupi chiar tu de livrarea celor necesare, unde este nevoie, chiar si acolo unde oamenii sunt deconectati de reteaua existenta de donatii.
                    </p>
                    <p>
                        Punem accent, de asemenea, pe nevoile specifice fiecarui om sau chiar, pe dorintele lui pe care nu ar indrazni in mod normal sa le exprime.
                    </p>
                </div>
                <div className="right-inside-container">
                    <img src="/images/romania-map.png" alt="harta Romaniei" />
                </div>

            </div>
        </section>
        <section className="urgent-needs-section container">
            <div className="urgent-needs-content">
                <h2>Nevoi urgente</h2>
                <div className="urgent-main">
                    <div className="left-inside-container">
                        <img src="/images/donate2.png" alt="" />
                    </div>
                    <div className="right-inside-container">
                        <h3>Ajuta un caz critic in timp util</h3>
                        <p>
                            Toti care apeleaza la noi au mare nevoie de ajutor si fiecare caz este important, dar unele neajunsuri pun in pericol in mod critic sanatatea
                        </p>
                        <button className="basic-button">
                            <span>
                                Vezi toate cazurile urgente
                            </span>
                            <IoIosArrowForward/>
                        </button>
                    </div>
                </div>
                <div className="posts-container">
                    {isLoading && <span>Loading..</span>}
                    {!isLoading && postsToShow && (
                        postsToShow.map(post => (
                            <SinglePost key={post.id} post={post}/>
                        ))
                    )}
                    {!isLoading && posts && posts.length==0 && <span>Nu sunt urgente.</span>}
                </div>

            </div>
        </section>
        <section className="motivational-section">
            <div className="container">
                <h3 className="motivational-subtitle">
                    Fii un erou
                </h3>
                <p>
                Praesent dignissim odio nisl, vel aliquet lacus vehicula vel.<br/>
                Fusce faucibus mi commodo leo consequat, non imperdiet ante tempor.<br/>
                Nam augue metus, blandit ut lorem sit amet
                </p>
            </div>
        </section>
    </>
  )
}

export default Homepage
