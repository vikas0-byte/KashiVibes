// slider.component.ts
import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #sliderRoot
      [class]="getRootClasses()"
      (mousedown)="onSliderMouseDown($event)"
      (touchstart)="onSliderTouchStart($event)"
      (keydown)="onKeyDown($event)"
      [attr.aria-disabled]="disabled"
      [attr.data-disabled]="disabled"
      role="slider"
      [attr.aria-valuenow]="value"
      [attr.aria-valuemin]="min"
      [attr.aria-valuemax]="max"
      tabindex="0"
    >
      <div class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <div 
          class="absolute h-full bg-primary" 
          [style]="getRangeStyle()"
        ></div>
      </div>
      <div
        #thumb
        class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        [style.left]="getThumbPosition()"
        (mousedown)="onThumbMouseDown($event)"
        (touchstart)="onThumbTouchStart($event)"
      ></div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() value: number[] | [number, number] = [50]; // Array to support multiple thumbs like Radix
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() className = '';

  @Output() valueChange = new EventEmitter<number[]>();
  @Output() valueCommit = new EventEmitter<number[]>(); // Like Radix's onValueCommit

  @ViewChild('sliderRoot') sliderRoot!: ElementRef<HTMLDivElement>;
  @ViewChild('thumb') thumb!: ElementRef<HTMLDivElement>;

  private isDragging = false;
  private activeThumbIndex = 0; // For multiple thumbs support
  private onChange = (value: number[]) => {};
  private onTouched = () => {};

  ngAfterViewInit() {
    // Add global event listeners for drag operations
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    document.addEventListener('touchmove', this.onTouchMove.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  ngOnDestroy() {
    // Clean up global event listeners
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
    document.removeEventListener('touchmove', this.onTouchMove.bind(this));
    document.removeEventListener('touchend', this.onTouchEnd.bind(this));
  }

  getRootClasses(): string {
    return `relative flex w-full touch-none select-none items-center ${this.className}`.trim();
  }

  getRangeStyle(): string {
    const percentage = ((this.value[0] - this.min) / (this.max - this.min)) * 100;
    return `width: ${percentage}%`;
  }

  getThumbPosition(): string {
    const percentage = ((this.value[0] - this.min) / (this.max - this.min)) * 100;
    return `calc(${percentage}% - 10px)`; // 10px is half of thumb width (20px/2)
  }

  updateValue(clientX: number): void {
    if (this.disabled) return;

    const slider = this.sliderRoot.nativeElement;
    const rect = slider.getBoundingClientRect();
    let percentage = (clientX - rect.left) / rect.width;
    percentage = Math.max(0, Math.min(1, percentage)); // Clamp between 0-1

    const rawValue = this.min + percentage * (this.max - this.min);
    const steppedValue = Math.round(rawValue / this.step) * this.step;
    const clampedValue = Math.max(this.min, Math.min(this.max, steppedValue));

    if (this.value[0] !== clampedValue) {
      this.value = [clampedValue];
      this.onChange(this.value);
      this.onTouched();
      this.valueChange.emit(this.value);
    }
  }

  // Mouse Events
  onSliderMouseDown(event: MouseEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    this.isDragging = true;
    this.updateValue(event.clientX);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.updateValue(event.clientX);
    }
  }

  onMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.valueCommit.emit(this.value); // Emit when drag ends (like Radix)
    }
  }

  onThumbMouseDown(event: MouseEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  // Touch Events
  onSliderTouchStart(event: TouchEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    this.isDragging = true;
    this.updateValue(event.touches[0].clientX);
  }

  onThumbTouchStart(event: TouchEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onTouchMove(event: TouchEvent): void {
    if (this.isDragging) {
      this.updateValue(event.touches[0].clientX);
    }
  }

  onTouchEnd(): void {
    if (this.isDragging) {
      this.isDragging = false;
      this.valueCommit.emit(this.value); // Emit when touch ends (like Radix)
    }
  }

  // Keyboard Navigation (exact same as Radix)
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    let newValue = this.value[0];

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newValue = Math.min(this.max, this.value[0] + this.step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newValue = Math.max(this.min, this.value[0] - this.step);
        break;
      case 'PageUp':
        event.preventDefault();
        newValue = Math.min(this.max, this.value[0] + this.step * 10);
        break;
      case 'PageDown':
        event.preventDefault();
        newValue = Math.max(this.min, this.value[0] - this.step * 10);
        break;
      case 'Home':
        event.preventDefault();
        newValue = this.min;
        break;
      case 'End':
        event.preventDefault();
        newValue = this.max;
        break;
      default:
        return;
    }

    if (newValue !== this.value[0]) {
      this.value = [newValue];
      this.onChange(this.value);
      this.onTouched();
      this.valueChange.emit(this.value);
      this.valueCommit.emit(this.value);
    }
  }

  // ControlValueAccessor Implementation
  writeValue(value: number | number[]): void {
    if (Array.isArray(value)) {
      this.value = value;
    } else {
      this.value = [value];
    }
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