import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createIsValidNumberValidator(itiProvider: () => any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const iti = itiProvider();
    if (iti && typeof iti.isValidNumber === 'function' && iti.isValidNumber()) {
      return null; // Valid
    }
    return { invalidNumber: true }; // Invalid
  };
}