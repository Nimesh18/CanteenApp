import { Component, OnInit } from '@angular/core';
import { Order } from './order.model';
import { CanteenSeverApiService } from '../../server-api/canteen-sever-api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  Orders: Array<Order>;

  Options: Array<any> = [
    { id: 1, name: 'Today' },
    { id: 2, name: 'Tomorrow' },
    { id: 3, name: 'This week' },
    { id: 4, name: 'This month' }
  ];

  selectedOption = 1;

  private i = 0; // for orders id, get this from DB

  constructor(private serverApi: CanteenSeverApiService) { }

  ngOnInit() {
    this.Orders = [
      new Order(++this.i, 1, 1, new Date(), new Date(2018, 11, 24), 'Chicken', 20.00, 'John'),
      new Order(++this.i, 2, 3, new Date(2018, 7, 15), new Date(2018, 10, 12), 'Potatoes', 15.00, 'Julie'),

    ]; // TODO: loadOrders() - load the orders from the DB
  }

  loadOrders() {

  }
}
