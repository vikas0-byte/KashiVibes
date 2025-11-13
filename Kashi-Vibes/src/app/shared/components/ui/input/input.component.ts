import { Component, input, output, model, computed, forwardRef, signal, booleanAttribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input
      [type]="type()"
      [class]="computedClass()"
      [value]="value()"
      (input)="onInput($event)"
      (blur)="onBlur()"
      (focus)="onFocus.emit($event)"
      [placeholder]="placeholder()"
      [disabled]="isDisabled()"
      [attr.aria-invalid]="invalid()"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  // Signal-based inputs (Angular 19 style)
  type = input<'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'file'>('text');
  className = input<string>('');
  placeholder = input<string>('');
  invalid = input<boolean>(false);
  disabledInput = input<boolean, unknown>(false, { transform: booleanAttribute });

  // Two-way binding with model (Angular 19 feature)
  value = model<string>('');

  // Additional events
  onFocus = output<FocusEvent>();
  onBlurEvent = output<void>(); // Changed to void since we don't have event

  // Combined disabled state (external input + CVA)
  private _cvaDisabled = false;

  // Computed disabled state
  isDisabled = computed(() => this.disabledInput() || this._cvaDisabled);


  // CVA required functions
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Computed signal for classes
  computedClass = computed(() => 
    cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      this.className()
    )
  );

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
    this.onBlurEvent.emit(); // Fixed: no argument needed
  }

  // CVA Implementation
  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled = isDisabled;
  }
}