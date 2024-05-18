import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return (control.value.password === control.value.confirmPassword) || (control.value.password === control.value.confirm_password)
    ? null
    : { PasswordNoMatch: true };
};
