import { updateCart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
await loadProductsFetch()

function loadPage(){
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId')
    const productId = url.searchParams.get('productId')
    const product = getProduct(productId)
    let date;
    let name;
    let image;
    let quantity;
    console.log(orders)
    orders.forEach(order => {
        if (orderId === order.id) order.products.forEach((orderItem)=>{
            if (productId === orderItem.productId){
                name = product.name
                image = product.image
                quantity = orderItem.quantity
                date = orderItem.estimatedDeliveryTime
            }
        });
    });
    const html = `
    
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders-exercise.html">
                View all orders
            </a>

            <div class="delivery-date">
                Arriving on ${date}
            </div>

            <div class="product-info">
                ${name}
            </div>

            <div class="product-info">
                Quantity: ${quantity}
            </div>

            <img class="product-image" src="${image}">

            <div class="progress-labels-container">
                <div class="progress-label">
                    Preparing
                </div>
                <div class="progress-label current-status">
                    Shipped
                </div>
                <div class="progress-label">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        </div>
    
    `
    document.querySelector('.main').innerHTML = html
    updateCart()
}
loadPage()