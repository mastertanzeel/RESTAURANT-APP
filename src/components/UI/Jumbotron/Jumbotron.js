import React from 'react';
import { Link } from 'react-router-dom';
import './Jumbotron.scss';

const Jumbotron = ({ title, subtitle, image, link, linkText }) => (
    <div className="jumbotron" style={{ backgroundImage: `url(${image})` }}>
        <div className="jumbo-container">
            <div>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </div>
            <Link to={link}>
                <button>
                    {linkText}
                </button>
            </Link>
        </div>
        <div className="fade-overlay" />
    </div>
)

export default Jumbotron;