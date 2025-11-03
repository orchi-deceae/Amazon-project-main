import { cart_class } from "./cart-class.js"

const orders = JSON.parse(localStorage.getItem('orders')) || []

export function saveOrderToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders))
}

export async function loadOrderFetch(){
    try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cart: cart_class.cart})
        })
        const order = await response.json()
        addOrder(order)
    }
    catch(err) {
        console.log('Unexpected error, Try again later.\n' + err)
        defaultBehavior()
    }
}

function addOrder(order){
    orders.push(order)
    saveOrderToStorage()
}

function defaultBehavior(){
    addOrder(backup)
}

const backup = [
    {
        id: "b029be1f-7b79-499a-9ffb-d83edaa7a003",
        orderTime: "2025-11-02T02:34:39.035Z",
        totalCostCents: 4703,
        products: [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                estimatedDeliveryTime: "2025-11-09T02:34:39.035Z",
                variation: null
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                estimatedDeliveryTime: "2025-11-09T02:34:39.035Z",
                variation: null
            }
        ]
    },
    {
        id: "8239c6c7-d7be-4b00-b802-0764741dcc1d",
        orderTime: "2025-11-03T20:20:39.926Z",
        totalCostCents: 4703,
        products: [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                estimatedDeliveryTime: "2025-11-10T20:20:39.926Z",
                variation: null
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                estimatedDeliveryTime: "2025-11-10T20:20:39.926Z",
                variation: null
            }
        ]
    }
]