export let cart = [
// {
//     productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//     quantity: 2
// },
// {
//     productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//     quantity: 1
// }
]

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
}

export function removeCart(productId){
    let newcart = []
    cart.forEach((cartItem)=>{
        if (productId !== cartItem.productId) newcart.push(cartItem)
    });
    cart = newcart
}