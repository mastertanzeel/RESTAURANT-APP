export const removeItemFromCart = (cart, index) => {
  let newCart = [...cart];
  newCart.splice(index, 1);
  return newCart;
};

export const addItemToCart = (cart, product) => {
  return [...cart, { ...product }];
};