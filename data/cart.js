export let cart = JSON.parse(localStorage.getItem('cart-exercise')) || [
]

function saveToStorage(){
    localStorage.setItem('cart-exercise', JSON.stringify(cart))
}

export function addToCart(button){
    const count = button.parentElement.querySelector('.product-quantity-container select')
    const productId = button.dataset.productId
    let mathchingItem;
    
    cart.forEach((item) => {
      if (item.productId === productId) mathchingItem = item
    });

    // This checks have we ever done this before
    if (mathchingItem) mathchingItem.quantity+= Number(count.value)
    else cart.push({
      productId, 
      quantity: Number(count.value),
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