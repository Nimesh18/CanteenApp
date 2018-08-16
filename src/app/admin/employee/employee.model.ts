export class Employee {
    constructor(
        public staff_id: string,
        public name: string,
        public account_balance: number,
        public tag_number: string) { }


    updateBalance(newBalance: number) {
        this.account_balance += newBalance;
    }
}
