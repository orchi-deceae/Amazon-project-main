// import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { isWeekend } from '../scripts/checkout/isWeekend.js';

export const deliveryOptions = [
{
    id: '1',
    deliveryDays: 7,
    priceCents: 0,
},
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999,
}
];

export function getDeliveryOption(deliveryOptionsId){
    let deliveryOption;
    deliveryOptions.forEach((options)=>{
        if (options.id === deliveryOptionsId) deliveryOption = options
    });
    return deliveryOption || deliveryOptions[0]
}

export function calcDeliveryDate(deliveryOption){
    try {
        let dayCount = Number(deliveryOption.deliveryDays)
        let date = dayjs()
        while (dayCount) {
            date = date.add(1, 'days')
            if (!isWeekend(date)) dayCount-=1
        }
        const dateString = date.format('dddd, D MMMM')
    }
    catch(er) {
        return 'Date error'
    }
    return dateString
}