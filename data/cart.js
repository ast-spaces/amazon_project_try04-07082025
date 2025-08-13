//create a cart array to take up the selected item => cartItem
export let cart = [];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  /* this is the same as the above code but used find()
  const matchingCartItem = cart.find((cartItem) => cartItem.productId === productId); 
  */

  if (matchingItem) {
    matchingItem.quantity += 1;
    } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
  console.log('Cart:', cart);
}
