import React from 'react';

// UI
import { Jumbotron } from '../components/UI';

// Assets
import JumboImage from '../assets/images/jumbo_temp.png';

const LandingPage = (props) => (
    <Jumbotron
        title={'Heimsendir'}
        subtitle={'Castello sendir heim'}
        image={JumboImage}
        link={'/overview'}
        linkText={'Panta'}
    />
)

export default LandingPage;