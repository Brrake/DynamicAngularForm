import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && typeof value === 'object' && value?.valid) {
    return null; // Validation passed
  }
  return { required: true }; // Validation failed
}