export const cart = [
    
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