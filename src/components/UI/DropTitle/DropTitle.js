import React from 'react';
import './DropTitle.scss';

const DropTitle = ({ title, options, value, onChange }) => (
    <div className="dropTitle">
        <select onChange={e => onChange(e.target.value)} value={value}>
            {options.map(opt => <option value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
)

export default DropTitle;