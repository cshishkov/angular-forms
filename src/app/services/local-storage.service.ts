import { Injectable } from '@angular/core';

import { RegistrationFormModel } from '../types/registration-form';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  saveData(key: string, data: Partial<RegistrationFormModel>): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadData(key: string): Partial<RegistrationFormModel> {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }
}
