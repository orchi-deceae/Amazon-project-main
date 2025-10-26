import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suit: addToCart', ()=>{
    it('adds an existing product to the cart', ()=>{
        spyOn(localStorage, 'setItem');// Turns off setItem
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 1,
                deliveryOptionsId: '1'  
            }])
        });
        loadFromStorage()

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(2)

    });
    it('adds a new product to the cart', ()=>{
        spyOn(localStorage, 'setItem');// Turns off setItem
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([])
            // JSON needs to parse a stringify or else it will fail so you cant put just []
            // cart = JSON.parse(//!localStorage.getItem('cart')) || []
        });
        loadFromStorage()// This changes cart fron json array to spyOn json array that will allows be empty because setItem is already hollow
         
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(1)
         
    });
});