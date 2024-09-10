import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-text-input',
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.scss'],
})
export class FormTextInputComponent {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  get control(): AbstractControl | null {
    return this.formGroup.get(this.controlName);
  }
}
