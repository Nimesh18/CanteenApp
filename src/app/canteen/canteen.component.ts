import { Component, OnInit } from '@angular/core';
import { CanteenSeverApiService } from '../server-api/canteen-sever-api.service';
import { Meal } from '../admin/meal/meal.model';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.css']
})
export class CanteenComponent implements OnInit {

  Meals: Array<Meal>;
  Menu: Array<{ count, Meal }>;
  /*[
     { id: 1, name: 'Chicken', count: 0 },
     { id: 2, name: 'Burger', count: 0 },
     { id: 3, name: 'Potatoes', count: 0 },
   ];*/

  options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(private serverApi: CanteenSeverApiService) { }

  retrieveMealsWithPromise() {
    this.serverApi.GetAllMeals().then(data => {
      if (data) {
        let i = 0;
        data['menu-items'].forEach(element => {
          const test = new Meal(element.description, element.price);
          this.Meals.push(test);
          i = i + 1;
          console.log('test' + i + ': ' + Date.now());
        });
        // console.log(this.Meals);
      }
    }).catch(response => {
      console.log(response);
    });
    console.log(this.Meals);
  }

  async retrieveMeals() {
    try {
      const response = await this.serverApi.GetAllMeals();
      if (response) {
        /*console.log(response);
        console.log(response['menu-items'][0].description);
        console.log(response['menu-items'][1].price);*/
        let i = 0;
        response['menu-items'].forEach(element => {
          const test = new Meal(element.description, element.price);
          this.Meals.push(test);
          i = i + 1;
          // console.log("await"+i+": "+Date.now());
        });
      }
    } catch (error) {
      console.log(error);
    }
    return 1;
  }

  async ngOnInit() {
    this.Meals = new Array<Meal>();
    this.Menu = new Array<{ count, Meal }>();
    const i = await this.retrieveMeals();
    // console.log(this.Meals.length);
    this.Meals.forEach(element => {
      const test = { count: 0, Meal: element };
      this.Menu.push(test);
      // console.log("  wadwa  wad");
    });
    /*while(this.Meals.length == 0)
    {
      //console.log(this.Meals)
    }*/
    // console.log(this.Meals.length);
    //// console.log(Date.now());
  }

  incrementCount(menuItem) {
    if (this.Menu.find(menu => menu.Meal.id === menuItem.id) && this.Menu.find(menu => menu.Meal.id === menuItem.id).count < 10) {
      this.Menu.find(menu => menu.Meal.id === menuItem.id).count++;
    }
  }

  decrementCount(menuItem) {
    if (this.Menu.find(menu => menu.Meal.id === menuItem.id) && this.Menu.find(menu => menu.Meal.id === menuItem.id).count > 0) {
      this.Menu.find(menu => menu.Meal.id === menuItem.id).count--;
    }
  }

  disableFinish() {
    return; // this.Menu.every(menuItem => menuItem.count === 0);
  }

  finish() {
    return true;
  }
}
