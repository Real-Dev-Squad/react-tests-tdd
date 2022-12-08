import React from 'react'

const StartBucksInput = ({name,value,onChange,error}) => {
  return (
    <div>
        <label htmlFor={name}>{name}</label>
        <input type="text" value={value} name={name} id={name}
        onChange={(e)=>onChange(e.target.value)}
        />
        {error && <p>{error}</p>}
    </div>
  )
}

export default StartBucksInput