import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule, Check } from 'lucide-angular';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      type="button"
      role="checkbox"
      [attr.aria-checked]="checked"
      [attr.data-state]="checked ? 'checked' : 'unchecked'"
      [class]="getCheckboxClasses()"
      (click)="toggle()"
      (keydown.space)="toggle(); $event.preventDefault()"
      (keydown.enter)="toggle(); $event.preventDefault()"
      (blur)="markAsTouched()"
      [disabled]="disabled"
      [attr.aria-disabled]="disabled"
    >
      @if (checked) {
        <span class="flex items-center justify-center text-current">
          <lucide-icon [img]="checkIcon" size="16"></lucide-icon>
        </span>
      }
    </button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() class = '';

  @Output() checkedChange = new EventEmitter<boolean>();

  // Lucide icon
  readonly checkIcon = Check;

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  toggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.checkedChange.emit(this.checked);
    }
  }

  markAsTouched(): void {
    this.onTouched();
  }

  getCheckboxClasses(): string {
    const baseClasses = [
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50'
    ].join(' ');

    const stateClass = this.checked 
      ? 'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground' 
      : '';

    return `${baseClasses} ${stateClass} ${this.class}`.trim();
  }

  // ControlValueAccessor methods
  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}