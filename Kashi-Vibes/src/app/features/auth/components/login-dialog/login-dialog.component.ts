import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

// Tumhare existing services
import { AuthService } from '../../../../Core/services/auth.service';
import { CustomValidators } from '../../../../utils/validators/custom.validators';
import { UserIllustrationComponent } from '../user-illustration/user-illustration.component';
import { X } from 'lucide-angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserIllustrationComponent],
  templateUrl: './login-dialog.component.html' // Tumhara existing template
})
export class LoginDialogComponent implements OnInit {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Output() switchToRegister = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly xIcon = X;

  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl: string = '/';

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    // Tumhara existing form structure
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Backend API call
    this.authService.login(this.loginForm.value)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.loginSuccess.emit();
            this.openChange.emit(false);
            this.loginForm.reset();
          } else {
            this.errorMessage = response.message || 'Login failed';
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'An error occurred during login';
          console.error('Login error:', error);
        }
      });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  onBackdropClick(event: MouseEvent): void {
    this.openChange.emit(false);
  }

  onSwitchToRegisterClick(): void {
    this.switchToRegister.emit();
  }
}