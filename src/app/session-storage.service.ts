import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})

export class SessionStorageService {

  public data: any[];
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) { this.data = []; }

  save(key: any, val: any): void {
    console.log('key: ' + key + 'value: ' + val);
    this.storage.set(key, val);
    this.data[key] = this.storage.get(key);
  }

  get(key: any): any {
    console.log('key: ' + key);
    this.data[key] = this.storage.get(key);
    console.log(this.data);
    return this.data[key];
  }

  clear(key: any): void {
    this.storage.remove(key);
  }
}
