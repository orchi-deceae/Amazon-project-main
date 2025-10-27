import { addToCart, cart, loadFromStorage, removeCart, updatedeliveryOption } from "../../data/cart.js";

describe('test suit: addToCart', ()=>{
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');// Turns off setItem
    });

    it('adds an existing product to the cart', ()=>{
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
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-exercise', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 2,
            deliveryOptionsId: '1'  
        }]))
    });

    it('adds a new product to the cart', ()=>{
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]) // localStorage.getItem() = return JSON.stringify([]), in all functions
        });
        loadFromStorage()
         
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(1)      
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-exercise', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 1,
            deliveryOptionsId: '1'  
        }]))
    });

});

describe('test suit: removeFromCart', ()=>{
    beforeEach(()=>{
        spyOn(localStorage, 'setItem');// Turns off setItem
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 1,
                deliveryOptionsId: '1'  
            }])
        });
        loadFromStorage()
    });
    it('remove a productId that is in the cart', ()=>{
        removeCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart.length).toEqual(0)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-exercise', JSON.stringify([]));
        
    });
    it('remove a productId that is not in the cart', ()=>{
        removeCart('15b6fc6f-327a-4ec4-896f-486349e85a3d')
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-exercise', JSON.stringify([{
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:1,
            deliveryOptionsId:"1"
        }]));
    });
});

describe('test suit: updateDeliveryOption', ()=>{
    beforeEach(()=>{
        spyOn(localStorage, 'setItem')
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 1,
                deliveryOptionsId: '1'  
            }])
        });
        loadFromStorage()
    });

    it('update the delivery option of a product in the cart', ()=>{
        updatedeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3')
        expect(cart).toEqual([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 1,
            deliveryOptionsId: '3'  
        }])
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-exercise', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 1,
            deliveryOptionsId: '3'  
        }]))
    });

    it('update the delivery option of a productId that is not in the cart', ()=>{
        updatedeliveryOption('fake id', '1')
        
        expect(cart).toEqual([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 1,
            deliveryOptionsId: '1'  
        }])
        expect(localStorage.setItem).not.toHaveBeenCalledWith('cart-exercise', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 1,
            deliveryOptionsId: '3'  
        }]))
    });

    it('use a deliveryOptionId that does not exist', ()=>{
        updatedeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '4')
        expect(cart).toEqual([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 1,
            deliveryOptionsId: '1'
        }])
        expect(localStorage.setItem).not.toHaveBeenCalledWith('cart-exercise', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 1,
            deliveryOptionsId: '1'  
        }]))
    });
});
