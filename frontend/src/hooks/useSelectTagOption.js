import React, { useState } from 'react'

const useSelectTagOption = () => {
    const [selectedTag, setSelectedTag] = useState(null)

    const handleSelectTag = async(e)=>{
        setSelectedTag(e.target.value)
    }

    return {selectedTag, handleSelectTag}
}

export default useSelectTagOption
