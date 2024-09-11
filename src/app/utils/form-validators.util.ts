import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

const names = ['user1', 'user2', 'user3'];

export function usernameValidator(control: AbstractControl): ValidationErrors | null {
  if (names.includes(control.value)) {
    return { usernameTaken: true };
  } else {
    return null;
  }
}

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(control.value)) {
    return { invalidEmail: true };
  } else {
    return null;
  }
}

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(control.value)) {
    return { weakPassword: true };
  } else {
    return null;
  }
}

export function referralCodeValidator(control: AbstractControl): ValidationErrors | null {
  const codeRegex = /^[A-Z]{3}\d{3}$/;
  if (!codeRegex.test(control.value)) {
    return { invalidReferralCode: true };
  } else {
    return null;
  }
}

export function match(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  };
}

