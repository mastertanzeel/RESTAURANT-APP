import React from 'react'
import {
	useMenuCategories,
	useMenuItems,
	usePizzas,
	useToppings,
	useOffers,
	useBranches
} from '../hooks'
import ReactJson from 'react-json-view'

function Branches () {
	const { branches, loading, error } = useBranches();
	console.log('branches', branches)

	if (loading) {
		return <p>Loading branches</p>
	}
	if (error) {
		return (
			<>
				<h2>Error loading branches - useBranches()</h2>
				<ReactJson src={error} />
			</>
		)
	}
	return (
		<>
			<h2>useBranches()</h2>
			<ReactJson src={branches} />
		</>
	)
}

function Offers () {
	const { offers, loading, error } = useOffers();
	console.log('offers', offers)

	if (loading) {
		return <p>Loading Offers</p>
	}
	if (error) {
		return (
			<>
				<h2>Error loading offers - useOffers()</h2>
				<ReactJson src={error} />
			</>
		)
	}
	return (
		<>
			<h2>useOffers()</h2>
			<ReactJson src={offers} />
		</>
	)
}

function MenuCategories () {
	const { menuCategories, loading, error } = useMenuCategories();
	console.log('menuCategories', menuCategories)

	if (loading) {
		return <p>Loading Menu Categories</p>
	}
	if (error) {
		return (
			<>
				<h2>Error loading Menu Categories - useMenuCategories()</h2>
				<ReactJson src={error} />
			</>
		)
	}
	return (
		<>
			<h2>useMenuCategories()</h2>
			<ReactJson src={menuCategories} />
		</>
	)
}

function MenuItems () {
	const { menuItems, loading, error } = useMenuItems();
	console.log('menuItems', menuItems)

	if (loading) {
		return <p>Loading Menu Items</p>
	}
	if (error) {
		return (
			<>
				<h2>Error loading Menu Items - useMenuItems()</h2>
				<ReactJson src={error} />
			</>
		)
	}
	return (
		<>
			<h2>useMenuItems()</h2>
			<ReactJson src={menuItems} />
		</>
	)
}


function Pizzas () {
	const { pizzas, loading, error } = usePizzas();
	console.log('pizzas', pizzas)

	if (loading) {
		return <p>Loading Pizzas</p>
	}
	if (error) {
		return (
			<>
				<h2>Error loading pizzas - usePizzas()</h2>
				<ReactJson src={error} />
			</>
		)
	}
	return (
		<>
			<h2>usePizzas()</h2>
			<ReactJson src={pizzas} />
		</>
	)
}

function Toppings () {
	const { toppings, loading, error } = useToppings();
	console.log('pizzas', toppings)

	if (loading) {
		return <p>Loading toppings</p>
	}
	if (error) {
		return (
			<>
				<h2>Error loading pizzas - useToppings()</h2>
				<ReactJson src={error} />
			</>
		)
	}
	return (
		<>
			<h2>useToppings()</h2>
			<ReactJson src={toppings} />
		</>
	)
}

export default function Debug() {
	// Just for debug purposes.
	return (
		<div>
			<h1>All current hooks</h1>
			<MenuCategories/>
			<MenuItems/>
			<Pizzas/>
			<Toppings/>
			<Branches/>
			<Offers/>
		</div>
	)
}
