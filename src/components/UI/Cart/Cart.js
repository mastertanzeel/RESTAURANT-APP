import React from 'react';
import RemoveIcon from './assets/remove_icon.svg';
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../../../redux/actions/cart';
import './Cart.scss';

export default function Cart({ visible, toggle }) {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    function removeItem(index) {
        dispatch(removeFromCart(index))
    }

    if (!visible) return null;

    return (
        <div className="cart-container">
            <div className="cart-modal">
                <div className="cart-items">
                    {
                        cart.map(({ name, price, type }, i) =>
                            <div className="cart-item" key={i}>
                                <h3 className="item-name">{name.en}</h3>
                                <div className="remove" onClick={e => removeItem(i)}>
                                    <img src={RemoveIcon} alt="taka úr körfu" />
                                </div>
                                <div className="item-price">{price}</div>
                            </div>
                        )
                    }
                </div>
                <a href="/checkout">
                    <button className="cart-button">
                        <h2>Panta</h2>
                        <p className="cta-subtitle">{cart.reduce((curr, acc) => acc.price + curr, 0)} kr</p>
                    </button>
                </a>
            </div>
            <div className="cart-background" onClick={toggle} />
        </div>
    )
}