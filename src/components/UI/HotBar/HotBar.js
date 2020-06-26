import React from 'react';
import './HotBar.scss';

const HotBar = ({ title, action, subtitle }) => (
    <div className="hot-bar" onClick={action}>
        {title && <h2>{title}</h2>}
        {subtitle && <p>{subtitle}</p>}
    </div>
)

export default HotBar;