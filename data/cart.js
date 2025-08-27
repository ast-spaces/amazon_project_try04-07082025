//create a cart array to take up the selected item => cartItem
export let cart = JSON.parse(localStorage.getItem('cart'));
console.log('Cart initiated: ', cart);


if (!cart) {
  cart = 
  [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    }, 
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }
  ]
}; 
// if the cart is empty, set it to the defaultCart)
console.log('Cart initialized:', cart);

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  /* this is the same as the above code but used find()
  const matchingCartItem = cart.find((cartItem) => cartItem.productId === productId); */


  if (matchingItem) {
    matchingItem.quantity += 1;
    } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  console.log('Items in cart as an array:', cart);
    //save cart to localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
  }
  saveCartToLocalStorage();
 }


  export function updateDeliveryOptions(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveCartToLocalStorage();
 };


