import { Meal } from '../admin/meal/meal.model';

export class MenuOption extends Meal {

    constructor(public description: string,
        public price: number, public quantity: number = 0) { super(description, price); }
}
