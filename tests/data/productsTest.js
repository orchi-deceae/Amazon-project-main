import { Appliance, Clothing, loadProductsFetch, Product, products } from "../../data/products.js"

describe('test suit: Product class', ()=>{
    let productClass;
    let randomProductClass;
    beforeAll(async ()=>{await loadProductsFetch()});
    beforeEach(()=>{
        productClass = products.filter((product)=>(product instanceof Product))
        randomProductClass = productClass[Math.round(Math.random() * (productClass.length-1))]
    });
    it('generate objects using each class', ()=>{
        expect(randomProductClass instanceof Product).toEqual(true)
        expect(products[0]).toEqual(new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
            stars: 4.5,
            count: 87
            },
            priceCents: 1090,
            keywords: [
            "socks",
            "sports",
            "apparel"
            ]
        }))
    });
    it('check if the properties and methods are correct', ()=>{
        expect(products[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(products[0].getPrice()).toEqual('10.90')
        expect(products[0].getStarsUrl()).toEqual(`images/ratings/rating-45.png`)
        expect(products[0].extraInfoHTML()).toEqual('')
    });
    
})
describe('test suit: Clothing class', ()=>{
    let productClass;
    let randomProductClass;
    beforeAll(async ()=>{await loadProductsFetch()});
    beforeEach(()=>{
        productClass = products.filter((product)=>(product instanceof Clothing))
        randomProductClass = productClass[Math.round(Math.random() * (productClass.length-1))]
    });
    it('generate objects using each class', ()=>{
        expect(randomProductClass instanceof Clothing).toEqual(true)
        expect(products[2]).toEqual(new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
            stars: 4.5,
            count: 56
            },
            priceCents: 799,
            keywords: [
            "tshirts",
            "apparel",
            "mens"
            ],
            type: "clothing",
        }))
    });
    it('check if the properties and methods are correct', ()=>{
        expect(products[2].id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
        expect(products[2].type).toEqual("clothing")
        expect(products[2].sizeChartLink).toEqual("images/clothing-size-chart.png")
        expect(products[2].getPrice()).toEqual('7.99')
        expect(products[2].getStarsUrl()).toEqual(`images/ratings/rating-45.png`)
        expect(products[2].extraInfoHTML()).toEqual(`
        <a href="images/clothing-size-chart.png" target="_blank">
            Size chart
        </a>
        `)
    });
})
describe('test suit: Appliance class', ()=>{
    let productClass;
    let randomProductClass;
    beforeEach(()=>{
        productClass = products.filter((product)=>(product instanceof Appliance))
        randomProductClass = productClass[Math.round(Math.random() * (productClass.length-1))]
    });
    it('Check if any product is an appliance', ()=>{
        expect(Boolean(randomProductClass)).toEqual(false)
    })
    /* 
    it('generate objects using each class', ()=>{
        expect(randomProductClass instanceof Appliance).toEqual(true)
        expect(products[3]).toEqual(new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
            stars: 5,
            count: 2197
            },
            priceCents: 1899,
            keywords: [
            "toaster",
            "kitchen",
            "appliances"
            ],
            type: "appliances"
        }))
    });
    it('check if the properties and methods are correct', ()=>{
        expect(products[3].id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add")
        expect(products[3].type).toEqual("appliances")
        expect(products[3].instructionstLink).toEqual("images/appliance-instructions.png")
        expect(products[3].warrantyLink).toEqual("images/appliance-warranty.png")
        expect(products[3].getPrice()).toEqual('18.99')
        expect(products[3].getStarsUrl()).toEqual(`images/ratings/rating-50.png`)
        expect(products[3].extraInfoHTML()).toEqual(`
        <a href="images/appliance-instructions.png" target="_blank">
            Instructions
        </a>
        <a href="images/appliance-warranty.png" target="_blank">
            Warranty
        </a>
        `)
    });
    */
})