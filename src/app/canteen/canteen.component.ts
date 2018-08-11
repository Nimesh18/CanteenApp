import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.css']
})
export class CanteenComponent implements OnInit {

  Menu = [
    { id: 1, name: 'Chicken', count: 0 },
    { id: 2, name: 'Burger', count: 0 },
    { id: 3, name: 'Potatoes', count: 0 },
  ];

  options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor() { }

  ngOnInit() {
  }

  incrementCount(menuItem) {
    if (this.Menu.find(menu => menu.id === menuItem.id) && this.Menu.find(menu => menu.id === menuItem.id).count < 10) {
      this.Menu.find(menu => menu.id === menuItem.id).count++;
    }
  }

  decrementCount(menuItem) {
    if (this.Menu.find(menu => menu.id === menuItem.id) && this.Menu.find(menu => menu.id === menuItem.id).count > 0) {
      this.Menu.find(menu => menu.id === menuItem.id).count--;
    }
  }

  disableFinish() {
    return this.Menu.every(menuItem => menuItem.count === 0);
  }

  finish() {
    return true;
  }
}
