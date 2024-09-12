import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControlOptions, AbstractControl } from '@angular/forms';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RegistrationFormModel, SkillModel } from 'src/app/types/registration-form';
import { emailValidator, match, passwordValidator, referralCodeValidator, usernameValidator } from 'src/app/utils/form-validators.util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted?: boolean;

  get usernameFormControl(): AbstractControl | null {
    return this.registrationForm.get('username');
  }

  get emailFormControl(): AbstractControl | null {
    return this.registrationForm.get("email");
  }

  get passwordFormControl(): AbstractControl | null {
    return this.registrationForm.get("password")
  }
  get confirmPasswordFormControl(): AbstractControl | null {
    return this.registrationForm.get("confirmPassword")
  }

  get phoneNumberFormControl(): AbstractControl | null {
    return this.registrationForm.get("phoneNumber")
  }

  get skills(): FormArray {
    return this.registrationForm.get('skills') as FormArray;
  }

  get referralCodeFormControl(): AbstractControl | null {
    return this.registrationForm.get("referralCode");
  }

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        username: ['', [
          Validators.required,
          usernameValidator
        ]],
        email: ['', [
          Validators.required,
          emailValidator
        ]],
        password: ['', [
          Validators.required,
          passwordValidator
        ]],
        confirmPassword: ['', [
          Validators.required
        ]],
        phoneNumber: ['', [
          Validators.pattern(/^\d{10}$/)
        ]],
        skills: this.fb.array([]),
        referralCode: [{
          value: '',
          disabled: true
        }],
        hasReferralCode: [false],
      },
      {
        validators: match('password', 'confirmPassword')
      } as AbstractControlOptions
    );

    this.loadFormData();
  }

  toggleReferralCode($event: MouseEvent): void {
    const checkbox = $event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.referralCodeFormControl?.enable();
      this.referralCodeFormControl?.setValidators([
        Validators.required,
        referralCodeValidator
      ]);
    } else {
      this.referralCodeFormControl?.disable();
      this.referralCodeFormControl?.reset();
      this.referralCodeFormControl?.clearValidators();
    }

    this.referralCodeFormControl?.updateValueAndValidity();
  }

  addSkill(): void {
    const skillGroup = this.fb.group({
      skill: ['']
    });

    this.skills.push(skillGroup);
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  loadFormData(): void {
    const savedData = this.localStorageService.loadData('registrationForm');

    if (!savedData) {
      return;
    }

    this.registrationForm.patchValue(savedData);

    this.skills.clear();

    if (savedData.skills && savedData.skills.length) {
      savedData.skills.forEach((skill: SkillModel): void => {
        const skillGroup = this.fb.group({
          skill: [skill.skill || '']
        });
        this.skills.push(skillGroup);
      });
    }

    if (savedData.hasReferralCode) {
      this.referralCodeFormControl?.enable();
    } else {
      this.referralCodeFormControl?.disable();
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formValue: Partial<RegistrationFormModel> = this.registrationForm.value;
      console.log(formValue);
      this.localStorageService.saveData('registrationForm', formValue);
      this.submitted = true;
    } else {
      this.submitted = false;
    }
  }
}
