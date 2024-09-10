import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormValidators {
  static predefinedUsernames = ['user1', 'user2', 'user3'];

  static usernameValidator(control: AbstractControl): ValidationErrors | null {
    if (FormValidators.predefinedUsernames.includes(control.value)) {
      return { usernameTaken: true };
    }
    return null;
  }

  static emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(control.value)) {
      return { weakPassword: true };
    }
    return null;
  }

  static referralCodeValidator(control: AbstractControl): ValidationErrors | null {
    const codeRegex = /^[A-Z]{3}\d{3}$/;
    if (!codeRegex.test(control.value)) {
      return { invalidReferralCode: true };
    }

    return null
  }

  static matchPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
