import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RegistrationForm } from 'src/app/types/registration-form';
import { FormValidators } from 'src/app/utils/form-validators.util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        username: ['', [Validators.required, FormValidators.usernameValidator]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            FormValidators.emailValidator,
          ],
        ],
        password: ['', [Validators.required, FormValidators.passwordValidator]],
        confirmPassword: ['', [Validators.required]],
        phoneNumber: ['', [Validators.pattern(/^\d{10}$/)]],
        skills: this.fb.array([]), // FormArray for skills
        referralCode: [''],
        hasReferralCode: [false],
      },
      { validators: FormValidators.matchPasswords }
    );

    this.loadFormData();

    this.registrationForm
      .get('hasReferralCode')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.registrationForm
            .get('referralCode')
            ?.setValidators([
              Validators.required,
              FormValidators.referralCodeValidator,
            ]);
        } else {
          this.registrationForm.get('referralCode')?.clearValidators();
        }
        this.registrationForm.get('referralCode')?.updateValueAndValidity();
      });
  }

  get skills(): FormArray {
    return this.registrationForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.group({ skill: '' }));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  loadFormData() {
    const savedData = this.localStorageService.loadData('registrationForm');
    if (savedData) {
      this.registrationForm.patchValue(savedData);
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValue: RegistrationForm = this.registrationForm.value;
      console.log('Form Submitted:', formValue);
      this.localStorageService.saveData('registrationForm', formValue);
      alert('Registration Successful!');
    }
  }
}
