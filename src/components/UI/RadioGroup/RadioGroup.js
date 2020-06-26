import React from 'react';
import './RadioGroup.scss';

const RadioGroup = ({ options, active, setActive }) => (
    <div className="radio-group">
        {
            options.map(option =>
                <button
                    className={`radio-button ${(active === option.value) ? 'active' : ''}`}
                    onClick={e => setActive(option.value)}
                >
                    {option.label}
                </button>
            )
        }
    </div>
)

export default RadioGroup;