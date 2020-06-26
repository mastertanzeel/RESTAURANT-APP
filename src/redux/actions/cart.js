import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../constants'

export function addToCart (product) {
  return { type: ADD_TO_CART, product }
}

export function removeFromCart (index) {
	return { type: REMOVE_FROM_CART, index }
}

export function resetCart() {
	return { type: CLEAR_CART }
}