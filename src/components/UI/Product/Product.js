import React from 'react';
import { Link } from 'react-router-dom';
import './Product.scss';

const Product = ({ title, description, variantPrices, price, image, action, icon }) => (
    <div className="product-card" onClick={e => action()}>
        <div className="cardBG"></div>
        <h2 className="pizzaName">{title}</h2>
        <p className="toppings">{description}</p>
        {
            !!variantPrices &&
            <div className="variant-prices">
                {
                    variantPrices.map((varPrice, i) =>
                        <div className="pizzaPrice" key={i}>
                            <b className="var-label">{varPrice.label}</b>
                            <b className="var-price">{varPrice.price} kr.</b>
                        </div>)
                }
            </div>
        }
        <button className="orderBtn">
            {icon && <img className="icon" src={icon} alt="Panta" />} {price || 'Panta'}
        </button>
        <div className="img-container">
            <img class="pizzaImg" src={image} alt={title} />
        </div>
    </div>
)

export default Product;