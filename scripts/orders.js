import { headerOperations } from "../data/cart-class.js";
import { orders, saveOrderToStorage } from "../data/orders.js";
import { getProduct, loadProductsFetch} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
await loadProductsFetch()


console.log(orders)
function loadPage(){
    let html = '';
    orders.forEach(order => {
        html += `
            <div class="order-container">

                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${order.orderTime}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">${getOrdersHtml(order)}</div>
            </div>
        `
    });
    document.querySelector('.-js-order-grid').innerHTML = html
    
    function getOrdersHtml(order){
        let html = ''
        let orderItems = order.products
        orderItems.forEach((orderItem)=>{
            const product = getProduct(orderItem.productId)
            html += `
                <div class="product-image-container">
                    <img src="${product.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${orderItem.estimatedDeliveryTime}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${orderItem.quantity}
                    </div>
                    <button class="buy-again-button -js-buy-again-button button-primary"
                    data-product-id=${orderItem.productId} data-order-id=${order.id}>
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking-exercise.html?orderId=${order.id}&productId=${orderItem.productId}">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            `
        })
        return html
    }

    document.querySelectorAll('.-js-buy-again-button').forEach((button)=>{
        button.addEventListener('click', ()=>{
            const productId = button.dataset.productId
            const orderId = button.dataset.orderId
            orders.forEach((order)=>{
                if (orderId === order.id) order.products.forEach((orderItem)=>{
                    if (productId === orderItem.productId) orderItem.quantity++
                })
            });
            saveOrderToStorage()
            loadPage()
        });
    });
    headerOperations()
}
loadPage()
