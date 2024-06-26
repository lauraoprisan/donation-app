import { createContext, useState, useEffect } from 'react';

const FilterContext = createContext({});

export const FilterProvider = ({ children }) => {
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null)


// useEffect(()=>{
//     console.log("test selectedStatus changed in filtercontext")
// },[selectedStatus])

    return (
        <FilterContext.Provider value={{
            selectedTag,
            setSelectedTag,
            selectedStatus,
            setSelectedStatus
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;