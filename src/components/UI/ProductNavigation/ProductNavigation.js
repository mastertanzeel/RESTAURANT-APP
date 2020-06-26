import React from 'react';
import './ProductNavigation.scss';

const ProductNavigation = ({ paths, currentPath, onChange }) => (
    <div className="product-naviation">
        <select value={currentPath} onChange={e => onChange(e.target.value)}>
            {
                !!paths && paths.map((path, i) =>
                    <option key={i} value={path.value}>{path.label}</option>
                )
            }
            {/* TODO : ADD ICON */}
        </select>
    </div>
)

export default ProductNavigation;