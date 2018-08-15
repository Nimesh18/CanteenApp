import { Injectable } from '@angular/core';
import { ServerAPI } from './server-api';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class CanteenSeverApiService {


  ServerApi: ServerAPI;
  constructor(private http: Http) {
    this.ServerApi = new ServerAPI(http);
  }

  // Login(username: string, password: string): Promise<any> {
  //   // tslint:disable-next-line:no-shadowed-variable
  //   return new Promise<any>((resolve, reject) => {
  //     const url = this.ServerApi.CreateURL('api/login');
  //     const obj = { 'username': username, 'password': password };
  //     this.http.post(url, obj).subscribe(result => {
  //       resolve(JSON.parse(result.text()));
  //     }, reject);
  //   });
  // }

  Login(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const url = this.ServerApi.CreateURL('/login');
      this.http.get(url).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }

  ScanCard(): Promise<any> {
    // return new Promise<any>((resolve, reject) => {
    //   const url = this.ServerApi.CreateURL('api/');
    //   this.http.get(url).subscribe(result => {
    //     resolve(JSON.parse(result.text()));
    //   }, reject);
    // });
    return null;
  }
  GetAllMeals() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.ServerApi.CreateURL('/menu-items')).subscribe(result => {
        resolve(JSON.parse(result.text()));
      }, reject);
    });
  }
}
