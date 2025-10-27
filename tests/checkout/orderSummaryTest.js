import { loadFromStorage, cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe('test suite: renderOrderSummary', ()=>{
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    
    beforeEach(()=>{
        spyOn(localStorage, 'setItem')
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 2,
                deliveryOptionsId: '1'  
            },{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', 
                quantity: 1,
                deliveryOptionsId: '2'  
            }])
        });
        document.querySelector('.js-test-container').innerHTML = `
        <div class="order-summary"></div>
        <div class="js-payment-summary"></div>
        <div class="checkout-header"></div>
        `;
        loadFromStorage()
        renderOrderSummary()
    });

    afterEach(()=>{
        document.querySelector('.js-test-container').innerHTML = ``;        
    });
    
    it('displays the cart', ()=>{
        expect(document.querySelectorAll('.cart-item-container').length).toEqual(2)
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2')
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1')
        
        expect(document.querySelector(`.js-product-name-${productId1}`).textContent).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs')
        expect(document.querySelector(`.js-product-name-${productId2}`).textContent).toContain('Intermediate Size Basketball')
        expect(document.querySelector(`.js-product-price-${productId1}`).textContent).toContain('$10.90')
        expect(document.querySelector(`.js-product-price-${productId2}`).textContent).toContain('$20.95')
    });


    it('Removes a product', ()=>{
        document.querySelector(`.js-delete-link-${productId1}`).click()

        expect(document.querySelectorAll('.cart-item-container').length).toEqual(1)
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null)
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null)
        expect(cart.length).toEqual(1)
        expect(cart[0].productId).toEqual(productId2)
        expect(document.querySelector(`.js-product-name-${productId2}`).textContent).toContain('Intermediate Size Basketball')
        expect(document.querySelector(`.js-product-price-${productId2}`).textContent).toContain('$20.95')
    });

    it("Updating delivery option", ()=>{
        // document.querySelector(`.js-delivery-option-${productId1}-3`).click()
        document.querySelector(`.js-delivery-option-${productId1}-3 input`).click()

        expect(document.querySelector(`.js-delivery-option-${productId1}-3 input`).checked).toEqual(true)
        expect(cart.length).toEqual(2)
        expect(cart[0]).toEqual({
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 2,
                deliveryOptionsId: '3'
            })
        expect(document.querySelector('.js-shipping-payments-').innerHTML).toContain('14.98')
        expect(document.querySelector('.js-total-payments-').innerHTML).toContain('63.50')
    });
});
