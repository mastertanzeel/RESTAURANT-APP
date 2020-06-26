import React from 'react';
import './CheckGroup.scss';

const CheckGroup = ({ title, options, values, toggle, secondaryToggle, secondaryLabel, valueKey }) => (
    <div className="check-group">
        <h3>{title}</h3>
        <div class="toppingsInGroup">
            {options.map(option =>
                <div className="check-box">
                    <button className={values.map(value => value[valueKey]).includes(option[valueKey]) ? 'active topping' : 'topping'} onClick={e => toggle(option[valueKey])}>
                        {option.label}
                    </button>
                    {
                        (!!option.secondary) &&
                        <button className={(values.find(val => val[valueKey] === option[valueKey]) ?.amount == 2) ? 'active double' : 'double'} onClick={e => secondaryToggle(option[valueKey])}>
                            {secondaryLabel}
                        </button>
                    }
                </div>
            )}
        </div>
    </div>
)

export default CheckGroup;