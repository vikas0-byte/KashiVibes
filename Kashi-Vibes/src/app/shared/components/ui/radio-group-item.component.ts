import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/utils';

@Component({
  selector: 'ui-radio-group-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      role="radio"
      [class]="computedClass"
      [attr.aria-checked]="checked"
      [class.data-state-checked]="checked"
      (click)="onSelect()"
    >
      <div class="flex items-center justify-center">
        <div class="h-2.5 w-2.5 rounded-full bg-current"></div>
      </div>
    </button>
  `
})
export class RadioGroupItemComponent {
  @Input() value: string = '';
  @Input() checked = false;
  @Input() class = '';
  @Output() selected = new EventEmitter<string>();

  get computedClass(): string {
    return cn(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      this.class
    );
  }

  onSelect(): void {
    this.selected.emit(this.value);
  }
}