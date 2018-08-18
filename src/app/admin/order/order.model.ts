export class Order {
    constructor(
        // public id: number,
        // public mealID?: number,
        // public employeeID?: number,
        public orderDate?: Date,
        // public mealExpiryDate?: Date,
        public mealDescription?: string,
        // public mealPrice?: number,
        public employeeName?: string
    ) { }

    static FormatDate(date: Date): string {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    Format(): any {
        return {
            'date_ordered': Order.FormatDate(this.orderDate),
            'item_description': this.mealDescription,
            'order_owner_name': this.employeeName
        };
    }

    FormatWithMappings(): any {
        return {
            'TableName': 'orders',
            'Item': {
                'order_id': {
                    'S': (Math.floor(Math.random() * 100000000) + 1).toString()
                },
                'date_ordered': {
                    'S': Order.FormatDate(this.orderDate)
                },
                'item_description': {
                    'S': this.mealDescription
                },
                'order_owner_name': {
                    'S': this.employeeName
                }
            }
        };
    }

}
