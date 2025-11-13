import { Component, Input, HostBinding, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LabelVariant = 'default'; // You can extend with more variants if needed

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label
      [for]="htmlFor"
      [class]="labelClasses"
      (click)="onLabelClick()"
    >
      <ng-content></ng-content>
    </label>
  `,
})
export class LabelComponent {
  private elementRef = inject(ElementRef);

  @Input() htmlFor?: string;
  @Input() className: string = '';

  @HostBinding('attr.data-state')
  get dataState(): string {
    // You can implement logic for different states if needed
    return 'default';
  }

  get labelClasses(): string {
    const baseClasses = [
      'text-sm',
      'font-medium',
      'leading-none',
      'peer-disabled:cursor-not-allowed',
      'peer-disabled:opacity-70'
    ].join(' ');

    return this.className ? `${baseClasses} ${this.className}` : baseClasses;
  }

  onLabelClick(): void {
    // If htmlFor is provided, focus the associated input
    if (this.htmlFor) {
      const targetElement = document.getElementById(this.htmlFor);
      if (targetElement && this.isFocusableElement(targetElement)) {
        targetElement.focus();
      }
    }
  }

  private isFocusableElement(element: Element): element is HTMLElement {
    return element instanceof HTMLElement && 
          (element.tagName === 'INPUT' || 
           element.tagName === 'SELECT' || 
           element.tagName === 'TEXTAREA' ||
           element.isContentEditable);
  }

  // Method to programmatically focus the associated input
  focusAssociatedControl(): void {
    if (this.htmlFor) {
      const targetElement = document.getElementById(this.htmlFor);
      if (targetElement && this.isFocusableElement(targetElement)) {
        targetElement.focus();
      }
    }
  }
}