
import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
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

function addToCart(button){
    let count = button.parentElement.querySelector('.product-quantity-container select')
    let mathchingItem;
    const productId = button.dataset.productId
    
    // This checks have we ever done this before
    cart.forEach((item) => {
      if (item.productId === productId) mathchingItem = item
    });

    if (mathchingItem) mathchingItem.quantity+= Number(count.value)
    else cart.push({
      productId, quantity: Number(count.value)
    })
}

function addPopUp(button, id){
    let addedPopUp = button.parentElement.querySelector('.added-to-cart').style

    addedPopUp.opacity = 1;
    if (addedPopUp.opacity) clearTimeout(id)
    id = setTimeout(()=>addedPopUp.opacity = '0', 2000)
    return id
}

function updateCart(){
    let cartQuantity = 0;
    cart.forEach((item) => cartQuantity += item.quantity);
    document.querySelector('.cart-quantity-js-').innerHTML = cartQuantity
}

document.querySelectorAll('.js-add-to-cart-').forEach((button) => {
    let id;
    button.addEventListener('click', () => {
        id = addPopUp(button, id)
        addToCart(button)
        updateCart()
    });
});
