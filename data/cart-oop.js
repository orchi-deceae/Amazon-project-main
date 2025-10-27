const cart = {
    cartItems: JSON.parse(localStorage.getItem('cart-oop-exercise')) || [],
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop-exercise')) || []
    },
    saveToStorage() {
        localStorage.setItem('cart-oop-exercise', JSON.stringify(this.cartItems))
    },
    addToCart(productId){
        let count = 1;
        let mathchingItem;
        document.querySelectorAll('.js-add-to-cart-').forEach((el)=>{
            if (productId === el.dataset.productId){
                count = el.parentElement.querySelector('.product-quantity-container select').value
            }
        });
        
        this.cartItems.forEach((item) => {
        if (item.productId === productId) mathchingItem = item
        });

        // This checks have we ever done this before
        if (mathchingItem) mathchingItem.quantity+= Number(count)
        else this.cartItems.push({
        productId, 
        quantity: Number(count),
        deliveryOptionsId: '1'
        })
        this.saveToStorage()
    },
    removeCart(productId){
        let newcart = []
        this.cartItemsrt.forEach((cartItem)=>{
            if (productId !== cartItem.productId) newcart.push(cartItem)
        });
        this.cartItemsart = newcart
        this.saveToStorage()
    },
    calcCartQuantity(total=0){
        this.cartItems.forEach((item)=>{total += item.quantity});
        return total
    },
    updateQuantity(productId, newQuantity){
        this.cartItems.forEach((i)=>{if (i.productId === productId) i.quantity = newQuantity});
        this.saveToStorage()
    },
    updatedeliveryOption(productId, deliveryOptionsId){
        let mathchingItem;
        this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) mathchingItem = cartItem
        });
        mathchingItem.deliveryOptionsId = deliveryOptionsId;
        this.saveToStorage()
    }
};