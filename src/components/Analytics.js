import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

export const initGA = () => {
    console.log('GA init')
    ReactGA.initialize('UA-MISSING-7')
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
    ReactPixel.pageView();
}

export const initPixel = () => {
    console.log('Pixel init')
    ReactPixel.init('238345850718655');
    ReactPixel.pageView();
}

export const logPageView = () => {
    console.log(`Logging pageview for ${window.location.pathname}`)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
    ReactPixel.pageView();
}

// Later
export const logEvent = (category = '', action = '') => {
    if (category && action) {
        ReactGA.event({ category, action });
    }
}
export const logException = (description = '', fatal = false) => {
    if (description) {
        ReactGA.exception({ description, fatal })
    }
}

export const trackLead = (num) => {
    ReactPixel.track('Lead');
    // window.dataLayer && dataLayer.push({ event: 'lead' });

    // Tracking multiple
    if (num) {
        for (let i = 0; i < num; i++) {
            ReactPixel.track('Lead');
            // window.dataLayer && dataLayer.push({ event: 'lead' });
        }
    }
}