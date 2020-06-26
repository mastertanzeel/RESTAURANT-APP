import React from 'react';
import './Tabs.scss';

const Tabs = ({ options, active, setActive }) => (
    <div className="tabs">
        {
            options.map(option =>
                <button
                    className={`tab ${(active === option.value) ? 'active' : ''}`}
                    onClick={e => setActive(option.value)}
                >
                    {option.label}
                </button>
            )
        }
    </div>
)

export default Tabs;