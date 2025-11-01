import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/car.js'

async function loadPage(){
    try {
        await loadProductsFetch()
        await new Promise((resolve, reject)=>{
            loadCart(()=>{resolve()});
        })
        renderOrderSummary()
        renderPaymentSummary()
        renderCheckoutHeader()
    }
    catch(err) {
        console.log('Unexpected error, Please try again later.\n' + err)
    }
}
loadPage()