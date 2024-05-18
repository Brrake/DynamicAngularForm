import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const linkValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.business_social.includes('https://') || control.value.business_social==''
    ? null
    : { linkNotValid: true };
};
