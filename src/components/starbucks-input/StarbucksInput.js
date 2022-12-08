import React from "react";

function StarbucksInput({name, value, onChange, error}) {
  return (
    <>
    <input 
    id="sbInput" 
    type="textbox" 
    name={name} 
    value={value} 
    onChange={(e) => onChange(e.target.value)}
    aria-label={name}
    />
    {error && <span>{error}</span>}
    </>
  )
}

export default StarbucksInput