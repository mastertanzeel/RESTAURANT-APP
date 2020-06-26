import React from 'react';
import './Button.scss';

const Button = ({ children, icon, onClick, active }) => (
    <div className="button-container" onClick={onClick}>
        <button className={active ? 'active' : ''}>
            {typeof icon === 'object' ? icon : <img src={icon} />}
            {children}
        </button>
    </div>
)


export default Button;