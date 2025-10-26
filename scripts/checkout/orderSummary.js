import { cart, removeCart, updatedeliveryOption, updateQuantity } from "../../data/cart.js";
import { calcDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummary() {
    let cartSummeryHTML = ''
    cart.forEach((cartItem) => {
        const matchingproduct = getProduct(cartItem.productId)
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);

        const dateString = calcDeliveryDate(deliveryOption)

        cartSummeryHTML += `          
        <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
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
                    <div class="product-quantity js-product-quantity-${matchingproduct.id}">
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
                        <span class="delete-quantity-link js-delete-quantity-link- js-delete-link-${matchingproduct.id} link-primary"
                        data-product-id=${matchingproduct.id}>
                            Delete
                        </span>
                    </div>
                </div>
    
                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingproduct, cartItem)}
                </div>
            </div>
        </div>
        `
    });

    document.querySelector('.order-summary').innerHTML = cartSummeryHTML

    function deliveryOptionsHTML(matchingproduct, cartItem, html = '') {
        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calcDeliveryDate(deliveryOption)
            const priceString = deliveryOption.priceCents ? formatCurrency(deliveryOption.priceCents) : 'Free'
            const ischecked = deliveryOption.id === cartItem.deliveryOptionsId;

            html += `
            <div class="delivery-option js-delivery-option-"
            data-product-id="${matchingproduct.id}"
            data-options-id="${deliveryOption.id}">
                <input type="radio" ${ischecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
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

    // deleteBtn
    document.querySelectorAll('.js-delete-quantity-link-').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId
            removeCart(productId)
            renderOrderSummary()
            renderPaymentSummary()
            renderCheckoutHeader()
        });
    });

    // updateBtn
    document.querySelectorAll('.js-update-quantity-link-').forEach((updateBtn) => {
        updateBtn.addEventListener('click', () => {
            updateBtn.parentElement.parentElement.parentElement.parentElement.classList.add('is-editing-quantity')
        });
    });

    // saveBtn
    document.querySelectorAll('.js-save-quantity-link-').forEach((saveBtn) => {
        saveBtn.addEventListener('click', () => {
            saveBtn.parentElement.parentElement.parentElement.parentElement.classList.remove('is-editing-quantity')
            const quantity = Number(saveBtn.previousElementSibling.value)
            const id = saveBtn.dataset.productId

            if (quantity <= 0 || quantity >= 1000) return alert('Error: Type a valide quantity')
            updateQuantity(id, quantity)
            renderPaymentSummary()
            renderOrderSummary()
            renderCheckoutHeader()
        });
        saveBtn.previousElementSibling.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveBtn.dispatchEvent(new Event('click'))
        });
    });

    // checkbox
    document.querySelectorAll('.js-delivery-option-').forEach((el) => {
        el.addEventListener('click', () => {
            const { productId, optionsId } = el.dataset
            updatedeliveryOption(productId, optionsId)
            renderOrderSummary()
            renderPaymentSummary()
            renderCheckoutHeader()
        });
    })


}