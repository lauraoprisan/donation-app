import React, { useContext } from 'react';
import { FaMapLocationDot } from 'react-icons/fa6'
import { PiTagSimpleFill } from 'react-icons/pi'
import FilterContext from '../../context/FilterContext';

const AllCasesSidebar = () => {
    const {selectedTag, setSelectedTag } = useContext(FilterContext);

    const handleSelectTag = (e) => {
        setSelectedTag(e.target.innerText === "Urgente" ? "Urgenta" : "Dorinta");
    };

  return (
    <>
        <form  className="regions-form" action="">
            <div className="sidebar-subtitle">
                <FaMapLocationDot />
                <h3 className="on-desktop">Regiuni</h3>
            </div>

            <select id="regions-options" name="" >
                <option value=""> Toata tara </option>
                <option value="">Vrancea</option>
                <option value="">Slanic</option>
                <option value="">Dobrogea</option>
            </select>
        </form>
        {/*this should be a component*/}
        <div className="choiced-regions">
            <div className='single-choice-region'>
                <span>Toata tara</span>
            </div>
            {/* <div className='single-choice-region'>
                <span>Vrancea</span>
                <IoCloseSharp />
            </div>
            <div className='single-choice-region'>
                <span>Dobrogea</span>
                <IoCloseSharp />
            </div> */}
        </div>
        <div className="sidebar-subtitle">
                <PiTagSimpleFill />
                <h3 className="on-desktop">Etichete</h3>
        </div>
        <div className="tags-section"> {/* use here event delegation in the future or even now for active tag button and also for setselecttag */}
            <button
                className={`sidebar-tag ${selectedTag === "Urgenta" ? "active-btn" : ""}`}
                onClick={(e)=>handleSelectTag(e)}>
                    Urgente
            </button>
            <button
                className={`sidebar-tag ${selectedTag === "Dorinta" ? "active-btn" : ""}`}
                onClick={(e)=>handleSelectTag(e)}>
                    Dorinte
            </button>
        </div>
    </>
  )
}

export default AllCasesSidebar
