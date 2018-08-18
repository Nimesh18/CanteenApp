import { Component, OnInit } from '@angular/core';
import { CanteenSeverApiService } from '../server-api/canteen-sever-api.service';
import { MenuOption } from './menu-option.model';
import { Order } from '../admin/order/order.model';
import { Employee } from '../admin/employee/employee.model';
import { SessionStorageService } from '../session-storage.service';

declare var $: any;
@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.css']
})
export class CanteenComponent implements OnInit {

  Menu: Array<MenuOption>;

  options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(private serverApi: CanteenSeverApiService, private sessionStorage: SessionStorageService) { }

  retrieveMealsWithPromise() {
    this.serverApi.GetAllMeals().then(data => {
      if (data) {
        // let i = 0;
        // data['menu-items'].forEach(element => {
        //   const test = new Meal(element.description, element.price);
        //   this.Meals.push(test);
        //   i = i + 1;
        //   console.log('test' + i + ': ' + Date.now());
        // });
        this.Menu = data['menu-items'];
        // console.log(this.Meals);
      }
    }).catch(response => {
      console.log(response);
    });
  }

  async retrieveMeals() {
    try {
      const response = await this.serverApi.GetAllMeals();
      if (response) {
        this.Menu = new Array<MenuOption>();
        response['menu-items'].forEach(menuOption => {
          this.Menu.push(new MenuOption(menuOption.description, menuOption.price));
        });
        console.log('Menu: ', this.Menu);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async ngOnInit() {
    await this.retrieveMeals();
  }

  incrementCount(menuItem: MenuOption) {
    if (menuItem && menuItem.quantity < 10) {
      menuItem.quantity++;
    }
  }

  decrementCount(menuItem: MenuOption) {
    if (menuItem && menuItem.quantity > 0) {
      menuItem.quantity--;
    }
  }

  disableFinish() {
    return this.Menu ? this.Menu.every(menuItem => menuItem.quantity === 0) : false;
  }

  async CreateOrder() {
    console.log('Menu ', this.Menu);
      this.Menu.forEach(menuOption => {
        const order = new Order(new Date(), menuOption.description, this.sessionStorage.get('username'));
        console.log('created order: ', order);
        this.serverApi.CreateOrder(order.FormatWithMappings()).then(response => {
          if (response) {
            console.log('Create order ', response);
          }
        }).catch(error => {
          console.log(error);
        });
      });
      this.show();
      this.retrieveMeals();
  }

  show() {
    $('#myModal').modal('show');
  }

  hide() {
    $('#myModal').modal('hide');
  }
}
