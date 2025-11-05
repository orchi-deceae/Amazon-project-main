

class Cart_Class {
    cart;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage()
    }

    loadFromStorage() {
        this.cart = JSON.parse(localStorage.getItem(this.#localStorageKey)) || []
    };
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cart))
    };

    addToCart(productId) {
        let count = 1;
        let mathchingItem;
        document.querySelectorAll('.js-add-to-cart-').forEach((el) => {
            if (productId === el.dataset.productId) {
                count = el.parentElement.querySelector('.product-quantity-container select').value
            }
        });

        this.cart.forEach((item) => {
            if (item.productId === productId) mathchingItem = item
        });

        // This checks have we ever done this before
        if (mathchingItem) mathchingItem.quantity += Number(count)
        else this.cart.push({
            productId,
            quantity: Number(count),
            deliveryOptionsId: '1'
        })
        this.saveToStorage()
    };

    removeCart(productId) {
        let newcart = []
        this.cart.forEach((cartItem) => {
            if (productId !== cartItem.productId) newcart.push(cartItem)
        });
        this.cart = newcart
        this.saveToStorage()
    };

    calcCartQuantity(total = 0) {
        this.cart.forEach((item) => { total += item.quantity });
        return total
    };

    updateQuantity(productId, newQuantity) {
        this.cart.forEach((i) => { if (i.productId === productId) i.quantity = newQuantity });
        this.saveToStorage()
    };

    updatedeliveryOption(productId, deliveryOptionsId) {
        let mathchingItem;
        this.cart.forEach((cartItem) => {
            if (cartItem.productId === productId) mathchingItem = cartItem
        });
        mathchingItem.deliveryOptionsId = deliveryOptionsId;
        this.saveToStorage()
    };

}

export const cart_class = new Cart_Class('cart-oop');

export async function loadCartFetch() {
    try {
        const response = await fetch('https://supersimplebackend.dev/cart')
        const data = await response.text()
        console.log(data)
    }
    catch (er) {
        console.log('Network issue. Please try again later.\n' + er)
    }
}

export function headerOperations() {
    document.querySelector('.cart-quantity-js-').innerHTML = cart_class.calcCartQuantity()
    searchListeners()
}

function searchListeners() {
    const searchBar = document.querySelector('.-js-search-bar')
    const searchButton = document.querySelector('.-js-search-button')
    searchBar.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') searchButton.click()
    });
    searchButton.addEventListener('click', () => {
        window.location.href = `/amazon-exercise.html?search=${searchBar.value}`
    });

}
// const businessCart = new Cart('cart-business');

// console.log(cart)
// console.log(businessCart)
// console.log(businessCart instanceof Cart)
