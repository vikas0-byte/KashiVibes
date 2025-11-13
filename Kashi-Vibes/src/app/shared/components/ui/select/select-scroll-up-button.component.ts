import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-scroll-up-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <svg
        class="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </div>
  `
})
export class SelectScrollUpButtonComponent {
  @Input() className: string = '';

  get computedClasses(): string {
    return `flex cursor-default items-center justify-center py-1 ${this.className}`.trim();
  }
}