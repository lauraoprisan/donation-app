import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const Cases = () => {
  return (
    <section className="cases-section">
        <div className="content-container">
            <h1 className="title">Alege cate un caz si fa cuiva viata mai frumoasa</h1>
            <div className="posts-container">
                {[1, 2, 3,4,5,6].map((num, index) => (
                    <div key={index} className="single-post-container">
                        <div className="img-post-container">
                            <img src="/images/img-placeholder.jpg" alt="" />
                            <button className="tag">Urgenta</button>
                        </div>
                        <div className="post-info-snippet">
                            <span className="location">
                                Locatie
                            </span>
                            <p>
                                Lista scurta cu nevoi urgente
                            </p>
                            <button className="basic-button">
                                <span>
                                    Vezi detalii
                                </span>
                                <IoIosArrowForward/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Cases
