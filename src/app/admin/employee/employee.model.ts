export class Employee {
    constructor(
        public id: number,
        public name: string,
        public balance: number) { }

    updateBalance(newBalance: number) {
        this.balance += newBalance;
    }
}
