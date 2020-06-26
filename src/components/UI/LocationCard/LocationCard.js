import React from 'react';
import './LocationCard.scss';

const LocationCard = ({ title, subtitle, openingHours, times, action }) => (
    <div className="location-card">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>

        <ul>
            {
                openingHours && Object.keys(openingHours).map(day =>
                    <li>
                        {day} {openingHours[day].from} - {openingHours[day].to}
                    </li>
                )
            }
        </ul>

        {action ?
            <button onClick={action.action}>
                <img src={action.icon} alt={action.label} /> {action.label}
            </button>
            :
            <ul className="times">
                {times ?.map(time =>
                    <li>
                        <p className="left">{time.label}</p>
                        <p className="right">{time.value}</p>
                    </li>
                )}
            </ul>
        }
    </div>
)

export default LocationCard;