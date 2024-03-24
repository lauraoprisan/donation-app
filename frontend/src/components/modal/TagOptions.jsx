import React, { useEffect, useState } from 'react'
import useSelectTagOption from '../../hooks/useSelectTagOption'

const TagOptions = ({setSelectedTag}) => {

    const {selectedTag, handleSelectTag} = useSelectTagOption()

    useEffect(()=>{
        setSelectedTag(selectedTag)
    },[selectedTag])

  return (

    <select className="tags-options-container" name="" id="" onClick={handleSelectTag}>
        {/* existing tags. map trhough them */}
        <option> </option>
        <option value="Urgenta">Urgenta</option>
        <option value="Dorinta">Dorinta</option>
        {/* add position relative to */}
    </select>
  )
}

export default TagOptions
