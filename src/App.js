import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import ApolloProvider from './graphql/apolloProvider';
import { Provider } from 'react-redux'
import { initializeStore, initializePersistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

// UI
import { Header, Cart } from './components/UI';
import SideMenu from './components/SideMenu';
import PizzaBox from './components/PizzaBox';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Util
import { Helmet } from 'react-helmet';
import GoogleTagManager from './components/GoogleTagManager';
import ScrollToTop from './components/ScrollToTop';

// Views
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import OverviewPage from './pages/OverviewPage';
import LocationsPage from './pages/LocationsPage';
import PizzaPage from './pages/PizzaPage';
import CheckoutPage from './pages/CheckoutPage';

// Debug
import Debug from './pages/Debug'

// Assets
import CastelloLogo from './assets/castello_logo.svg';
import BurgerIcon from './assets/icons/burger.svg';
import ClosedIcon from './assets/icons/close_door.svg'

const store = initializeStore();
const persistor = initializePersistor(store);

const url = 'https://castello.is/';
const slogan = 'Castello pizzur';
const twitterImage = ""; //TODO: import correct
const ogImage = ""; //TODO: import correct


function App() {

	const [drawer, setDrawer] = useState();
	const [cartVisible, setCartVisible] = useState(false);

	function toggleCartVisible() {
		setCartVisible(!cartVisible)
	}


	return (
		<ApolloProvider>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<div id="app">
						<GoogleTagManager gtmId='GTM-NM6BQFW' />
						{/* Head meta tags etc.. */}
						<Helmet>
							<meta charSet='utf-8' />
							<title>Castello</title>
							<link rel='canonical' href={url} />

							<meta name='description' content={slogan} />
							<meta name='keywords' content={`Castello, pizza, pitsa`} />

							{/* Twitter */}
							<meta name='twitter:card' content='summary_large_image' />
							<meta name='twitter:site' content='@castello' />
							<meta name='twitter:creator' content='@castello' />
							<meta name='twitter:title' content={'Castello'} />
							<meta name='twitter:description' content={slogan} />
							<meta name='twitter:image' content={twitterImage} />

							{/* Facebook / Pinterest */}
							<meta name='og:title' content='Castello' />
							<meta name='og:type' content='website' />
							<meta name='og:url' content={url} />
							<meta name='og:image' content={ogImage} />
							<meta name='og:description' content={slogan} />
						</Helmet>
						<Router>
							<ScrollToTop>
								<Header
									logo={CastelloLogo}
									leftIcon={BurgerIcon}
									leftAction={() => setDrawer(!drawer)}
									rightIcon={<PizzaBox />}
									rightAction={toggleCartVisible}
									notificationIcon={ClosedIcon}
									notificationText={"Ekki er hægt að panta þegar allir staðir eru lokaðir"}
								/>
								<Switch>
									<Route exact path="/" component={LandingPage} />
									<Route path="/debug" component={Debug} />
									<Route path="/overview" component={OverviewPage} />
									<Route path="/locations" component={LocationsPage} />
									<Route path="/checkout" component={CheckoutPage} />

									{/* Keep last for routing-priority */}
									<Route path="/pizza/:slug" component={PizzaPage} />
									<Route path="/:slug" component={CategoryPage} />

								</Switch>
							</ScrollToTop>
							<Cart
								visible={cartVisible}
								toggle={toggleCartVisible}
							/>
							{!!drawer && <SideMenu onClose={() => setDrawer(false)} />}
						</Router>
					</div>
				</PersistGate>
			</Provider>
			<ToastContainer />
		</ApolloProvider >
	);
}

export default App;
