export let cart = JSON.parse(localStorage.getItem('cart-exercise')) || [
]

function saveToStorage(){
    localStorage.setItem('cart-exercise', JSON.stringify(cart))
}

export function addToCart(button){
    const count = button.parentElement.querySelector('.product-quantity-container select')
    const productId = button.dataset.productId
    let mathchingItem;
    
    // This checks have we ever done this before
    cart.forEach((item) => {
      if (item.productId === productId) mathchingItem = item
    });

    if (mathchingItem) mathchingItem.quantity+= Number(count.value)
    else cart.push({
      productId, quantity: Number(count.value)
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