import { AbstractControl } from '@angular/forms';

export function PasswordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const passwordConfirmation = control.get('passwordConfirmation');
  return password &&
    passwordConfirmation &&
    password.value !== passwordConfirmation.value
    ? { confirmPasswordError: true }
    : null;
}
