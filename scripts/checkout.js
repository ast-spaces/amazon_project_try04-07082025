import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/formatCurrency.js';
import dayjs from 'http://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'

//cart initiated empty
console.log('Initiated as cart in amazon.js: ', cart);

let cartContainersHTML = '';
cart.forEach((cartItem) => {

  //assign cartItem productId to a variable to be held
  const productId = cartItem.productId;

  //to deduplicate data => access all the values in the products data
  let matchingProduct;
  products.forEach((product) =>{
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  console.log('The cartItems in cart: ', matchingProduct);
  console.log('The cartItems in cart: ', cartItem);
  /*
  1) the above console.log() shows the matchingProduct is getting the product data from the products.js and the cartItem shows each of the item being pushed into the cart as a cartItem. Both are results of a forEach() loopping.
  */

  //assign deliveryOptionId to a variable to be held
  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  console.log('dateString: ', dateString);

  console.log('deliveryOption: ', deliveryOption);

//create cartSummaryHTML
  cartContainersHTML += `
    <div class="cart-item-container js-cart-item-container" data-product-id="${productId}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${matchingProduct.image}>

        <div class="cart-item-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct,cartItem)}
        </div>
      </div>
    </div>
  `;
  console.log('cartSummaryHTML: ', cartContainersHTML)
  document.querySelector('.js-cart-summary').innerHTML = cartContainersHTML;

});

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveCartToLocalStorage();
}

 document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.closest('.js-cart-item-container').dataset.productId;
      removeFromCart(productId);

    const container = document.querySelector(`
      .js-cart-item-container[data-product-id="${productId}"]`)
    container.remove();
    });
  });


//generating the deliveryOptionsHTML code => dynamic.
//two variables needed: dateString and a priceString. They will replace the static data shown as looping actions taking place.
function deliveryOptionsHTML(matchingProduct,cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {

    //Getting the dateString with dayjs external lib
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    console.log('dateString: ', dateString);

    //getting the priceString..(ternery operators used)
    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} - `;
    console.log('priceString: ', priceString);

    //check if current delivery option matches cart item's 
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += 
    ` 
      <div class="delivery-option">
        <input type="radio"  ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  })

  return html;

}






