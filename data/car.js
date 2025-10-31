class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    /**
     * Car class
     */
    constructor(carDetails) {
        this.#brand = carDetails.brand
        this.#model = carDetails.model
    }

    displayInfo() {
        return console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk status: "${this.isTrunkOpen?'open':'closed'}"`)
    }

    go() {
        if (!this.isTrunkOpen) this.speed+=5
        if (this.speed > 200) return this.speed = 200
    }
    
    brake() {
        this.speed-=5
        if (this.speed < 0) return this.speed = 0
    }

    openTrunk() {
        if (!this.speed) this.isTrunkOpen = true
    }
    
    closeTrunk() {
        this.isTrunkOpen = false
    }
}

class RaceCar extends Car {    
    constructor (carDetails) {
        super(carDetails)
        this.acceleration = carDetails.acceleration;
    }
    go() {
        if (!this.isTrunkOpen) this.speed+=this.acceleration
        if (this.speed > 300) return this.speed = 200
    }
    brake() {
        if (!this.isTrunkOpen) this.speed-=this.acceleration
        if (this.speed < 0) return this.speed = 0
    }
    openTrunk(){
        this.isTrunkOpen = false
    }
}

const cars = [
    {
        brand: 'Toyota',
        model: 'Corolla'
    },
    {
        brand: 'Tesla',
        model: 'Model 3'
    },
    {
        brand: 'McLaren',
        model: 'F1',
        acceleration: 20
    }
].map((carDetails)=>{
    if (carDetails.acceleration) return new RaceCar(carDetails)
    return new Car(carDetails)
});

console.log(cars)

cars.forEach((car)=>{
    car.displayInfo()
    car.go()
    car.displayInfo()
    car.go()
    car.displayInfo()
    car.go()
    car.displayInfo()
    car.brake()
    car.brake()
    car.displayInfo()
});