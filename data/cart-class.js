

export class Cart_Class {
    cart = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey
        this.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    }

    loadFromStorage() {
        this.cart = JSON.parse(localStorage.getItem(this.#localStorageKey)) || []
    };
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cart))
    };
    
    addToCart(productId){
        let count = 1;
        let mathchingItem;
        document.querySelectorAll('.js-add-to-cart-').forEach((el)=>{
            if (productId === el.dataset.productId){
                count = el.parentElement.querySelector('.product-quantity-container select').value
            }
        });
        
        this.cart.forEach((item) => {
        if (item.productId === productId) mathchingItem = item
        });

        // This checks have we ever done this before
        if (mathchingItem) mathchingItem.quantity+= Number(count)
        else this.cart.push({
        productId, 
        quantity: Number(count),
        deliveryOptionsId: '1'
        })
        this.saveToStorage()
    };

    removeCart(productId){
        let newcart = []
        this.cartrt.forEach((cartItem)=>{
            if (productId !== cartItem.productId) newcart.push(cartItem)
        });
        this.cartart = newcart
        this.saveToStorage()
    };

    calcCartQuantity(total=0){
        this.cart.forEach((item)=>{total += item.quantity});
        return total
    };

    updateQuantity(productId, newQuantity){
        this.cart.forEach((i)=>{if (i.productId === productId) i.quantity = newQuantity});
        this.saveToStorage()
    };

    updatedeliveryOption(productId, deliveryOptionsId){
        let mathchingItem;
        this.cart.forEach((cartItem) => {
        if (cartItem.productId === productId) mathchingItem = cartItem
        });
        mathchingItem.deliveryOptionsId = deliveryOptionsId;
        this.saveToStorage()
    };
    
}

// const cart = new Cart('cart-oop');
// const businessCart = new Cart('cart-business');

// console.log(cart)
// console.log(businessCart)
// console.log(businessCart instanceof Cart)
