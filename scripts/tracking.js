import { headerOperations } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
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

    let today;
    let orderTime;
    let deliveryTime;
    console.log(orders)
    orders.forEach(order => {
        if (orderId === order.id) order.products.forEach((orderItem)=>{
            if (productId === orderItem.productId){
                name = product.name
                image = product.image
                quantity = orderItem.quantity
                date = dayjs(orderItem.estimatedDeliveryTime)
                date = date.format('dddd D MMMM, YYYY')

                today = dayjs()
                orderTime =  dayjs(order.orderTime)
                deliveryTime = dayjs(orderItem.estimatedDeliveryTime)
            }
        });
    });
    const percentProgress = ((today - orderTime)/(deliveryTime - orderTime)) * 100
    console.log(percentProgress)
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
                <div class="progress-label
                ${percentProgress<50?'current-status':''}">
                    Preparing
                </div>
                <div class="progress-label
                ${percentProgress>=50 && percentProgress<100?'current-status':''}">
                    Shipped
                </div>
                <div class="progress-label
                ${percentProgress === 100?'current-status':''}">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${percentProgress}%"></div>
            </div>
        </div>
    
    `
    document.querySelector('.main').innerHTML = html
    headerOperations()
}
loadPage()