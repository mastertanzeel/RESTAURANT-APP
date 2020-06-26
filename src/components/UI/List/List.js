import React from 'react';
import { Link } from 'react-router-dom';

import './List.scss';

const List = ({ items, listIcon }) => (
    <div className="list">
        <div>
            {items.map(item =>
                <Link to={item.path} className="list-item">
                    <h2 className="whatUWant">
                        <img src={listIcon} alt={item.label} />
                        {item.label}
                    </h2>
                </Link>
            )}
        </div>
    </div>
)

export default List;