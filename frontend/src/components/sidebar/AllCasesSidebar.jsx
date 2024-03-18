import React from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { PiTagSimpleFill } from 'react-icons/pi'

const AllCasesSidebar = () => {
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
        <div className="tags-section">
            <button className="sidebar-tag">Urgente</button>
            <button className="sidebar-tag">Dorinte</button>
        </div>
    </>
  )
}

export default AllCasesSidebar
