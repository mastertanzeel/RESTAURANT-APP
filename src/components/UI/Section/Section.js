import React from 'react';
import './Section.scss';

const Section = ({ title, children, wide }) => (
    <section className={`section ${wide ? 'wide' : ''}`}>
        <h1 className="title">{title}</h1>
        {children}
    </section>
)

export default Section;