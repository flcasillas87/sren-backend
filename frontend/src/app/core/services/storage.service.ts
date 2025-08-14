@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T = any>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}




import { Injectable } from '@angular/core';
