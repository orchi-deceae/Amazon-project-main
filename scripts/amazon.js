
import { cart, addToCart, calcCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let allproducts = [];
products.forEach((product) => {
    const productsHTML = `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-"
          data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
        `

        allproducts += productsHTML
    });
document.querySelector('.products-grid-js-').innerHTML = allproducts

function addPopUp(button, id){
    let addedPopUp = button.parentElement.querySelector('.added-to-cart').style

    addedPopUp.opacity = 1;
    if (addedPopUp.opacity) clearTimeout(id)
    id = setTimeout(()=>addedPopUp.opacity = '0', 2000)
    return id
}

function updateCart(){
    document.querySelector('.cart-quantity-js-').innerHTML = calcCartQuantity()
}

document.querySelectorAll('.js-add-to-cart-').forEach((button) => {
    let id;
    button.addEventListener('click', () => {
        id = addPopUp(button, id)
        addToCart(button.dataset.productId)
        updateCart()
    });
});

updateCart()