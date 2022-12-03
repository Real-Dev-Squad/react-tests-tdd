import React from 'react';
import PropTypes from 'prop-types';


const StarbucksInput = ({ name, value, onChange, error }) => {
    return (
        <>
        <label htmlFor={name}>{name}</label>
        <input
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        {error && <span>{error}</span>}
        </>
    )
};
    
StarbucksInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};

StarbucksInput.defaultProps = {
    value: '',
    onChange: () => { },
    error: '',
    name: ""
};

export default StarbucksInput;