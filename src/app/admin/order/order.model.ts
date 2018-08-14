export class Order {
    constructor(
        public id: number,
        public mealID: number,
        public employeeID: number,
        public orderDate?: Date,
        public mealExpiryDate?: Date,
        public mealDescription?: string,
        public mealPrice?: number,
        public employeeName?: string
    ) { }

}
