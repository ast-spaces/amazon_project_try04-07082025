//create a cart array to take up the selected item => cartItem
export let cart = 
[
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  }, 
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }
];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
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
      id: productId,
      quantity: 1
    });
  }
  console.log('Cart:', cart);
}
