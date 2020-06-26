import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../constants';
import { addItemToCart, removeItemFromCart } from '../utils/cart.utils'

// Cart can contain
// type: PIZZA / MENUITEM / OFFER
// qty on each
// size on pizza - SMALL / MEDIUM / LARGE
// 
// const defaultCart = [{
//   type: 'Pizza',
//   id: '123',
//   name: 'Pizza Napoli',
//   toppings: [{
//     id: '1',
//     name: 'Sauce',
//     amount: 1
//   }, {
//     id: '2',
//     name: 'Cheese',
//     amount: 1
//   }, {
//     id: '3',
//     name: 'Basil',
//     amount: 1
//   }, {
//     id: '4',
//     name: 'Pepperoni',
//     amount: 1
//   }],
//   size: 'LARGE',
//   details: null,
// }, {
//   type: 'MenuItem',
//   id: '123',
//   name: 'Coka cola 2.0L',
//   toppings: null,
//   details: null
// }, {
//   type: 'Offer',
//   id: '333',
//   name: 'Kóngatilboð',
//   toppings: null,
//   details: [{
//     type: 'Pizza',
//     id: '123',
//     size: 'large',
//     name: 'Pizza Napoli',
//     toppings: [{
//       id: '1',
//       name: 'Sauce',
//       amount: 1
//     }, {
//       id: '2',
//       name: 'Cheese',
//       amount: 1
//     }, {
//       id: '3',
//       name: 'Basil',
//       amount: 1
//     }, {
//       id: '4',
//       name: 'Pepperoni',
//       amount: 1
//     }],
//   }, {
//     type: 'Pizza',
//     id: '123',
//     size: 'large',
//     name: 'Pizza Napoli',
//     toppings: [{
//       id: '1',
//       name: 'Sauce',
//       amount: 1
//     }, {
//       id: '2',
//       name: 'Cheese',
//       amount: 1
//     }, {
//       id: '3',
//       name: 'Basil',
//       amount: 1
//     }, {
//       id: '4',
//       name: 'Pepperoni',
//       amount: 1
//     }, {
//       type: 'MenuItem',
//       id: '123',
//       name: 'Coka cola 2.0L',
//     }],
//   }]
// }]

const initialState = [];

export default function(state = initialState, action) {
  const { type, product, index } = action // extract the type and payload before the switch statement
  switch (type) {
    case ADD_TO_CART: {
      return addItemToCart(state, product)
    }
    case REMOVE_FROM_CART: {
      return removeItemFromCart(state, index)
    }
    case CLEAR_CART: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}