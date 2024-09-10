import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-password-input',
  templateUrl: './form-password-input.component.html',
  styleUrls: ['./form-password-input.component.scss'],
})
export class FormPasswordInputComponent {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;
  @Input() placeholder: string = '';
}
