import React from 'react';
// Smá svindl:
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = ({ logo, leftIcon, leftAction, rightIcon, rightAction, notificationIcon, notificationText }) => {

    const cart = useSelector(state => state.cart);

    return (
        <header className={`header ${notificationText ? 'not' : ''}`}>
            <div>
                <img
                    onClick={leftAction}
                    className="action"
                    src={leftIcon}
                    alt="left action"
                />
            </div>
            <div>
                <Link to={'/'}>
                    <img className="logo" src={logo} alt="logo" />
                </Link>
            </div>
            <div>
                {cart.length ? <div
                    onClick={rightAction}
                    className="action"
                    alt="rigth action"
                >
                    {rightIcon}
                </div>
                    :
                    <Link to={'/overview'}>
                        <button className="order-button">Panta</button>
                    </Link>
                }
            </div>

            {/* Notification */}
            {
                !!notificationText &&
                <div className="header-notification">
                    {!!notificationIcon && <img src={notificationIcon} alt="" />}
                    <p>{notificationText}</p>
                </div>
            }
        </header>
    )
}

export default Header;