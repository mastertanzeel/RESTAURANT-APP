import React from 'react';
import './CheckBox.scss';

const CheckBox = ({ label, ...rest }) => (
    <div className="checkbox-container">
        <label className="checkbox-label">
            <p className="label">{label}</p>
            <input type="checkbox" {...rest} />
            <span className="checkmark"></span>
        </label>
    </div>
)

export default CheckBox;