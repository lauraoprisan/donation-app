import { createContext, useState, useEffect } from 'react';

const FilterContext = createContext({});

export const FilterProvider = ({ children }) => {
    const [selectedTag, setSelectedTag] = useState(null);

    return (
        <FilterContext.Provider value={{
            selectedTag,
            setSelectedTag
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;