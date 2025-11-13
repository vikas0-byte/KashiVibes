import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }

  static mobile(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    
    const mobileRegex = /^[6-9][0-9]{9}$/;
    const isValid = mobileRegex.test(control.value);
    
    return isValid ? null : { mobile: true };
  }

  static email(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(control.value);
    
    return isValid ? null : { email: true };
  }

  static strongPassword(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumeric = /[0-9]/.test(control.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    const isValidLength = control.value.length >= 8;
    
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isValidLength;
    
    return passwordValid ? null : { strongPassword: true };
  }

  static noWhitespace(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    
    return isValid ? null : { whitespace: true };
  }

  static onlyLetters(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    const isValid = onlyLettersRegex.test(control.value);
    
    return isValid ? null : { onlyLetters: true };
  }

  static alphanumeric(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    const isValid = alphanumericRegex.test(control.value);
    
    return isValid ? null : { alphanumeric: true };
  }
}