import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RegistrationFormModel, SkillModel } from 'src/app/types/registration-form';
import { emailValidator, MustMatch, passwordValidator, referralCodeValidator, usernameValidator } from 'src/app/utils/form-validators.util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  registrationForm!: FormGroup;
  submitted?: boolean;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
  ) {
  }

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
          Validators.required,
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
        validators: MustMatch('password', 'confirmPassword')
      }
    );

    this.loadFormData();
  }

  toggleReferralCode($event: MouseEvent) {
    const checkbox = $event.target as HTMLInputElement;
    const referralCodeControl = this.registrationForm.get('referralCode');

    if (checkbox.checked) {
      referralCodeControl?.enable();
      referralCodeControl?.setValidators([
        Validators.required,
        referralCodeValidator
      ]);
    } else {
      referralCodeControl?.disable();
      referralCodeControl?.reset();
      referralCodeControl?.clearValidators();
    }

    referralCodeControl?.updateValueAndValidity();
  }


  get skills(): FormArray {
    return this.registrationForm.get('skills') as FormArray;
  }

  addSkill() {
    const skillGroup = this.fb.group({
      skill: ['']
    });

    this.skills.push(skillGroup);
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  loadFormData() {
    const savedData = this.localStorageService.loadData('registrationForm');
    if (savedData) {
      this.registrationForm.patchValue(savedData);

      this.skills.clear();

      if (savedData.skills && savedData.skills.length) {
        savedData.skills.forEach((skill: SkillModel) => {
          const skillGroup = this.fb.group({
            skill: [skill.skill || '']
          });
          this.skills.push(skillGroup);
        });
      }

      if (savedData.hasReferralCode) {
        this.registrationForm.get('referralCode')?.enable();
      } else {
        this.registrationForm.get('referralCode')?.disable();
      }
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValue: Partial<RegistrationFormModel> = this.registrationForm.value;
      console.log(formValue);
      this.localStorageService.saveData('registrationForm', formValue);
      this.submitted = true;
    } else {
      this.submitted = false;
    }
  }

  onResetClick() {
    this.submitted = false;
    this.registrationForm.reset();
  }
}
