import { Injectable } from '@angular/core';
import { RegistrationForm } from '../types/registration-form';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveData(key: string, data: Partial<RegistrationForm>) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadData(key: string): Partial<RegistrationForm> {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }
}
