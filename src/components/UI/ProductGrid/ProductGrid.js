import React from 'react';
import './ProductGrid.scss';

const ProductGrid = ({ children }) => (
    <div className="productContainer">
        {children}
    </div>
)

export default ProductGrid;