import React from 'react';
import './Form.scss';

const Form = ({ key, title, subtitle, children, ctaTitle, ctaAction, ctaIcon }) => (
    <form className="form" onSubmit={e => e.preventDefault()} key={key}>
        {title && <h1>{title}</h1>}
        {subtitle && <h3>{subtitle}</h3>}
        {children}
        {ctaTitle &&
            <button className="cta" onClick={ctaIcon} onClick={() => ctaAction()}>
                {!!ctaIcon && <img src={ctaIcon} alt={ctaTitle} />}
                {ctaTitle}
            </button>
        }
    </form>
)

export default Form;