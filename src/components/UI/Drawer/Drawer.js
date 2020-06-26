import React from 'react';
import { Link } from 'react-router-dom';
import './Drawer.scss';



const Drawer = ({ links, footer, action, actionLabel, onClose }) => (
    <div className="drawer-container">
        <div className="drawer">
            <div className="drawerHeadingList">
                {links.map(link =>
                    <Link to={link.path} onClick={e => onClose()}>
                        <h2 className="drawerHeadings">{link.label}</h2>
                    </Link>
                )}
            </div>
            <div className="footer">{footer}</div>
            <button className="drawer-action" onClick={e => action()}>
                {actionLabel}
            </button>
        </div>
        <div className="invisible-container" onClick={e => onClose()} />
    </div>
)

export default Drawer;