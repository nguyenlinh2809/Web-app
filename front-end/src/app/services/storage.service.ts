import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}
  setItem(key: STORAGE_KEY, value: any): void {
    localStorage.setItem(key, value ? JSON.stringify(value) : null);
  }
  getItem(key: STORAGE_KEY): any {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return value;
  }
  clear(): void {
    localStorage.clear();
  }
  clearItem(key: STORAGE_KEY): void {
    localStorage.removeItem(key);
  }
}

export enum STORAGE_KEY {
  user = 'USER',
  rememberUser = 'REMEMBER_USER'
}
