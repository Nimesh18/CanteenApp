import { Injectable } from '@angular/core';
import { ServerAPI } from './server-api';
import { Http } from '@angular/http';
import { Employee } from '../admin/employee/employee.model';
import { Meal } from '../admin/meal/meal.model';
@Injectable({
  providedIn: 'root'
})
export class CanteenSeverApiService {


  ServerApi: ServerAPI;
  constructor(private http: Http) {
    this.ServerApi = new ServerAPI(http);
  }

  Login(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const url = this.ServerApi.CreateURL('/login');
      this.http.get(url).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }

  GetAllMeals() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.ServerApi.CreateURL('/menu-items')).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }

  AddMeal(meal: Meal) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.ServerApi.CreateURL('/menu-items/add'), JSON.stringify(meal)).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }

  DeleteMeal(description: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.ServerApi.CreateURL('/menu-items/delete'), JSON.stringify(description)).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }

  GetEmployees() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.ServerApi.CreateURL('/staff')).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }

  AddEmployee(employee: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.ServerApi.CreateURL('/staff/add/userv2'), JSON.stringify(employee)).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }

  LoadCredit(employee: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.ServerApi.CreateURL('/staff/add/credit'), JSON.stringify(employee)).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }

  UpdateEmployee(employee: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.ServerApi.CreateURL('/staff/add/user'), JSON.stringify(employee)).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }

  GetOrders() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.ServerApi.CreateURL('/orders')).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }
}
