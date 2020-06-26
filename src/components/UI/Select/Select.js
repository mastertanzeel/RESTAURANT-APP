import React from 'react';
import './Select.scss';

const Select = ({ value, options, label, ...rest }) => (
    <div className="select-container">
        <label>
            <b>{label}</b>
            <select value={value} {...rest}>
                {options.map(option =>
                    <option value={option.value}>{option.label || option.value}</option>
                )}
            </select>
        </label>
    </div>
)

export default Select;