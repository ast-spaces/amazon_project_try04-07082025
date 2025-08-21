import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/formatCurrency.js';
import dayjs from 'http://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from './scripts/deliveryOptions.js'

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
 console.log('The cartItems in cart: ', matchingProduct);
  });
//create cartSummaryHTML
  cartContainersHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
            <span class="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  console.log('cartSummaryHTML: ', cartContainersHTML)
  document.querySelector('.js-cart-summary').innerHTML = cartContainersHTML;
});




