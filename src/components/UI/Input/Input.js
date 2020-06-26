import React from 'react';
import './Input.scss';

const Input = ({ label, type = "text", ...rest }) => (
    <div className="input-container">
        <b>{label}</b>
        <input type={type} {...rest} />
    </div>
)

export default Input;