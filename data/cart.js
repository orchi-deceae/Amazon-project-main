import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart-exercise')) || []

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart-exercise')) || []
}

function saveToStorage(){
    localStorage.setItem('cart-exercise', JSON.stringify(cart))
}

export function addToCart(productId){
    let count = 1;
    let mathchingItem;
    document.querySelectorAll('.js-add-to-cart-').forEach((el)=>{
        if (productId === el.dataset.productId){
            count = el.parentElement.querySelector('.product-quantity-container select').value
        }
    });
    
    cart.forEach((item) => {
      if (item.productId === productId) mathchingItem = item
    });

    // This checks have we ever done this before
    if (mathchingItem) mathchingItem.quantity+= Number(count)
    else cart.push({
      productId, 
      quantity: Number(count),
      deliveryOptionsId: '1'
    })
    saveToStorage()
}

export function removeCart(productId){
    let newcart = []
    cart.forEach((cartItem)=>{
        if (productId !== cartItem.productId) newcart.push(cartItem)
    });
    cart = newcart
    saveToStorage()
}

export function calcCartQuantity(total=0){
    cart.forEach((item)=>{total += item.quantity});
    return total
}

export function updateQuantity(productId, newQuantity){
    cart.forEach((i)=>{if (i.productId === productId) i.quantity = newQuantity});
    saveToStorage()
}

export function updatedeliveryOption(productId, deliveryOptionsId){
    let mathchingItem;
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) mathchingItem = cartItem
    });
    if (!mathchingItem) return
    if (Number(deliveryOptionsId)<1 || Number(deliveryOptionsId)>3) return
    mathchingItem.deliveryOptionsId = deliveryOptionsId;
    saveToStorage()
}