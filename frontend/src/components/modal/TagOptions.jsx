import React, { useEffect, useState } from 'react'
import useSelectTagOption from '../../hooks/useSelectTagOption'

const TagOptions = ({onChange, post}) => {

    // const {selectedTag, handleSelectTag} = useSelectTagOption()

    // useEffect(()=>{
    //     setSelectedTag(selectedTag)
    // },[selectedTag])

  return (

    <select className="tags-options-container" name="tag" id="" onChange={onChange} value={post.tag}>
        {/* existing tags. map trhough them */}
        <option> </option>
        <option value="Urgenta">Urgenta</option>
        <option value="Dorinta">Dorinta</option>
        {/* add position relative to */}
    </select>
  )
}

export default TagOptions
