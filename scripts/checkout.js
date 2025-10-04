import { calcCartQuantity, cart, removeCart, updateQuantity } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

hello()

const today = dayjs()
const delivaryDate = today.add(7, 'days')
console.log(delivaryDate.format('dddd, D MMMM'))



let cartSummeryHTML = ''
cart.forEach((cartItem, i) => {
    const productId = cartItem.productId
    let matchingproduct
    products.forEach((product) => {
        if (product.id == productId) matchingproduct = product
    });

    const deliveryId = cartItem.deliveryOptionsId
    let deliveryOption;
    deliveryOptions.forEach((options)=>{
        if (options.id === deliveryId) {
            deliveryOption = options
        }
    });
    
    const today = dayjs()
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days')
    const dateString = deliveryDate.format('dddd, D MMMM')

    cartSummeryHTML += `          
    <div class="cart-item-container">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingproduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingproduct.name}
                </div>
                <div class="product-price">
                $${formatCurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span class="js-quantity-">
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link js-update-quantity-link- link-primary">
                        Update
                    </span>
                    <input class="quantity-input- js-quantity-input-">
                    <span class="save-quantity-link- js-save-quantity-link- link-primary"
                    data-product-id=${matchingproduct.id}>
                        Save
                    </span>
                    <span class="delete-quantity-link js-delete-quantity-link- link-primary"
                    data-product-id=${matchingproduct.id}>
                        Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(i)}
            </div>
        </div>
    </div>
    `
});
function deliveryOptionsHTML(i, html = ''){
    deliveryOptions.forEach((options, index) => {
        const today = dayjs()
        const deliveryDate = today.add(options.deliveryDays, 'days')
        const dateString = deliveryDate.format('dddd, D MMMM')
        const priceString = options.priceCents ? formatCurrency(options.priceCents) : 'Free'
        const ischecked = !index ? 'checked' : '';

        html += `<div class="delivery-option">
            <input type="radio" ${ischecked}
                class="delivery-option-input"
                name="delivery-option-${i+1}">
            <div>
                <div class="delivery-option-date">
                ${dateString}
                </div>
                <div class="delivery-option-price">
                ${priceString} Shipping
                </div>
            </div>
        </div>`
    });
    return html
}

document.querySelector('.order-summary').innerHTML = cartSummeryHTML

// delete link on items
document.querySelectorAll('.js-delete-quantity-link-').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId
        removeCart(productId)
        updateCart()
        link.parentElement.parentElement.parentElement.parentElement.remove()
    });
});

// Top middle
function updateCart(){
    document.querySelector('.js-return-to-home-link-').innerHTML = `${calcCartQuantity()} items`
}
updateCart()

// updateBtn
document.querySelectorAll('.js-update-quantity-link-').forEach((updateBtn)=>{
    updateBtn.addEventListener('click', ()=>{
        updateBtn.parentElement.parentElement.parentElement.parentElement.classList.add('is-editing-quantity')
    });
});

// saveBtn
document.querySelectorAll('.js-save-quantity-link-').forEach((saveBtn)=>{
    saveBtn.addEventListener('click', ()=>{
        saveBtn.parentElement.parentElement.parentElement.parentElement.classList.remove('is-editing-quantity')
        const quantity = Number(saveBtn.previousElementSibling.value)
        const id = saveBtn.dataset.productId

        if (quantity <= 0 || quantity >= 1000) return alert('Error: Type a valide quantity')
        saveBtn.parentElement.querySelector('.quantity-label').innerHTML = quantity
        updateQuantity(id, quantity)
        updateCart()
    });
    saveBtn.previousElementSibling.addEventListener('keydown', (e)=>{
        if (e.key === 'Enter') saveBtn.dispatchEvent(new Event('click'))
    });
});
