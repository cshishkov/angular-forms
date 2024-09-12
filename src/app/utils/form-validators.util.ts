import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

import { Constants } from './constants.util';

export function usernameValidator(control: AbstractControl): ValidationErrors | null {
  if (Constants.PREDEFINED_NAMES.includes(control.value)) {
    return { usernameTaken: true };
  } else {
    return null;
  }
}

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (Constants.EMAIL_REGEX.test(control.value)) {
    return { invalidEmail: true };
  } else {
    return null;
  }
}

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  if (Constants.PASSWORD_REGEX.test(control.value)) {
    return { weakPassword: true };
  } else {
    return null;
  }
}

export function referralCodeValidator(control: AbstractControl): ValidationErrors | null {
  if (Constants.REFERRAL_CODE_REGEX.test(control.value)) {
    return { invalidReferralCode: true };
  } else {
    return null;
  }
}

export function match(controlName: string, matchingControlName: string): (formGroup: FormGroup) => null {
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

