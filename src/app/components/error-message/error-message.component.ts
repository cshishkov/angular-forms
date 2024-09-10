import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl | null;

  get errorMessage(): string | null {
    if (this.control?.touched && this.control?.errors) {
      if (this.control.errors['required']) {
        return 'This field is required';
      }
      if (this.control.errors['email']) {
        return 'Invalid email format';
      }
      if (this.control.errors['minlength']) {
        return `Minimum length is ${this.control.errors['minlength'].requiredLength}`;
      }
      if (this.control.errors['maxlength']) {
        return `Maximum length is ${this.control.errors['maxlength'].requiredLength}`;
      }
      if (this.control.errors['usernameTaken']) {
        return 'This username is already taken';
      }
      if (this.control.errors['pattern']) {
        return 'Invalid pattern';
      }
      if (this.control.errors['mustMatch']) {
        return 'Passwords do not match';
      }
    }
    return null;
  }
}
