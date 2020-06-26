import gql from 'graphql-tag'

export const ALL_PIZZAS = gql`
	query allPizzas {
		allPizzas {
			totalCount
			edges {
				node {
					id
					name {
						en
						is
					}
					description {
						en
						is
					}
					slug
					imageUrl
					imagePublicId
					priceSmall
					priceMedium
					priceLarge
					toppings {
						amount
						topping {
							id
							name {
								en
								is
							}
							priceSmall
							priceLarge
							priceMedium
							maxAmount
						}
					}
				}
			}
		}
	}
`

export const ALL_TOPPINGS = gql`
	query allToppings {
		allToppings {
			edges {
				node {
					category {
						id
						name {
							en
							is
						}
					}
					toppings {
					id
						name {
							en
							is
						}
						priceSmall
						priceMedium
						priceLarge
						maxAmount 
					}
				}
			}
		}
	}
`

export const ALL_MENU_CATEGORIES = gql`
	query allMenuCategories {
		allMenuCategories {
			totalCount
			edges {
				node {
					name {
						en
						is
					}
					slug
					id
				}
			}
		}
	}
`

export const ALL_MENU_ITEMS = gql`
	query allMenuItems ($category: ID) {
		allMenuItems (category: $category) {
			totalCount
			edges {
				node {
					category {
						name {
							en
							is
						}
						id
						slug
					}
					items {
						id
						slug
						name {
							en
							is
						}
						price
						description {
							en
							is
						}
						imageUrl
						imagePublicId
						category {
							id
							name {
								en
								is
							}
						} 
					}
				}
			}
		}
	}
`

export const ALL_OFFERS = gql`
	query allOffers {
		allOffers {
			totalCount
			edges {
				node {
					name {
						en
						is
					}
					description {
						en
						is
					}
					offerValidDays
					offerValidHours {
						from
						to
					}
					details {
						size
						isMenuPizza
						allowedItems
						offerType
						toppingAmount
					}
					slug
					id
					isValid
					isDelivery
					isPickup
					price
					imageUrl
					imagePublicId
				}
			}
		}
	}
`

export const ALL_BRANCHES = gql`
	query allBranches {
		allBranches {
			totalCount
			edges {
				node {
					id
					name
					address {
						street
						city
						postalCode
					}
					phone
					homeDeliveryPostalCodes
					estimatedPickupTime
					estimatedDeliveryTime
					openingHours {
						mon {
							from
							to
						}
						tue {
							from
							to
						}
						wed {
							from
							to
						}
						thu {
							from
							to
						}
						fri {
							from
							to
						}
						sat {
							from
							to
						}
						sun {
							from
							to
						}
					}
				}
			}
		}
	}
`