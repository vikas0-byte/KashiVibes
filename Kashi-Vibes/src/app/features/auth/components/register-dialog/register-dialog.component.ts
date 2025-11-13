import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

// Tumhare existing services
import { AuthService } from '../../../../Core/services/auth.service';
import { CustomValidators } from '../../../../utils/validators/custom.validators';
import { UserIllustrationComponent } from '../user-illustration/user-illustration.component';
import { X } from 'lucide-angular';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserIllustrationComponent],
  templateUrl: './register-dialog.component.html' // Tumhara existing template
})
export class RegisterDialogComponent implements OnInit {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() switchToLogin = new EventEmitter<void>();
  @Output() registerSuccess = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  readonly xIcon = X;

  registerForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    // Tumhara existing form structure
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(50),
        CustomValidators.onlyLetters
      ]],
      email: ['', [Validators.required, CustomValidators.email]],
      mobile: ['', [Validators.required, CustomValidators.mobile]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        CustomValidators.strongPassword
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: CustomValidators.passwordMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Backend API call
    this.authService.register(this.registerForm.value)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.registerSuccess.emit();
            this.openChange.emit(false);
            this.registerForm.reset();
          } else {
            this.errorMessage = response.message || 'Registration failed';
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'An error occurred during registration';
          console.error('Registration error:', error);
        }
      });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });
  }

  onBackdropClick(event: MouseEvent): void {
    this.openChange.emit(false);
  }

  onSwitchToLoginClick(): void {
    this.switchToLogin.emit();
  }
}