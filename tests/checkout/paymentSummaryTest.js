import { cart_class } from "../../data/cart-class.js";
import { loadProductsFetch } from "../../data/products.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";

describe('test suit: renderPaymentSummary', () => {
    beforeAll(async ()=>{await loadProductsFetch()});

    beforeEach(() => {
        spyOn(localStorage, 'setItem')
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionsId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionsId: '2'
            }])
        });
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-payment-summary"></div>
        `;
        cart_class.loadFromStorage()
        renderPaymentSummary()
    })

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('displays elements correctly', () => {
        expect(document.querySelector('.js-payment-summary').innerHTML).toContain('Order Summary')
        expect(document.querySelector('.js-payment-summary').innerHTML).toContain('Order total:')
        expect(document.querySelectorAll('.js-payment-summary').length).toEqual(1)
        expect(cart_class.cart).toEqual([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionsId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionsId: '2'
        }])
        expect(localStorage.setItem).not.toHaveBeenCalledWith('cart-exercise', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionsId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionsId: '2'
        }]))
    });

    it('all calculations are correct', () => {
        expect(document.querySelector('.js-product-payments-').innerHTML).toContain('42.75')
        expect(document.querySelector('.js-shipping-payments-').innerHTML).toContain('4.99')
        expect(document.querySelector('.js-before-tax-payments-').innerHTML).toContain('47.74')
        expect(document.querySelector('.js-tax-payments-').innerHTML).toContain('4.77')
        expect(document.querySelector('.js-total-payments-').innerHTML).toContain('52.51')
    })
});