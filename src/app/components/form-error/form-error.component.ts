import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() errorMessages!: Record<string, string>

  get errorKeys(): string[] {
    return this.control && this.control.errors ? Object.keys(this.control.errors) : [];
  }
}
