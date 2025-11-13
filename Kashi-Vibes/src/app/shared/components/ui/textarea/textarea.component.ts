import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface TextareaProps {
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  maxlength?: number;
  minlength?: number;
  required?: boolean;
  className?: string;
}

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  template: `
    <textarea
      [class]="textareaClasses"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [rows]="rows"
      [cols]="cols"
      [maxLength]="maxlength"
      [minLength]="minlength"
      [required]="required"
      [value]="value"
      (input)="onInput($event)"
      (blur)="onBlur()"
      (focus)="onFocus()"
      #textareaElement
    ></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor, TextareaProps {
  private elementRef = inject(ElementRef);

  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() rows: number = 3;
  @Input() cols?: number;
  @Input() maxlength?: number;
  @Input() minlength?: number;
  @Input() required: boolean = false;
  @Input() className: string = '';

  // Yeh dono important hain two-way binding ke liye
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Output() blur = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();

  // ControlValueAccessor methods
  private onChange = (value: any) => {};
  private onTouched = () => {};

  get textareaClasses(): string {
    const baseClasses = [
      'flex',
      'min-h-[80px]',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'px-3',
      'py-2',
      'text-sm',
      'ring-offset-background',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50'
    ].join(' ');

    return this.className ? `${baseClasses} ${this.className}` : baseClasses;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  onBlur(): void {
    this.onTouched();
    this.blur.emit();
  }

  onFocus(): void {
    this.focus.emit();
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value || '';
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

  // Focus method similar to React's ref
  focusTextarea(): void {
    this.elementRef.nativeElement.querySelector('textarea')?.focus();
  }
}