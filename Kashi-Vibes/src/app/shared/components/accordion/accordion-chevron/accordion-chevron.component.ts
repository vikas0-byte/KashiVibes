import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-chevron',
  standalone: true,
  imports: [],
  template: `
    <svg [class]="hostClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24" [attr.data-state]="isOpen ?'open' : 'close'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>

    </svg>
  `,
  styles: ``
})
export class AccordionChevronComponent {
  @Input() isOpen: boolean = false;
  @Input() className: string = '';

  @HostBinding('class')
  get hostClasses(): string {
    const baseClasses = [
      'accordion-chevron',
      'h-4 w-4 shrink-0 transition-transform duration-200',
      this.isOpen ? 'rotate-180' : 'rotate-0',
      this.className
    ].filter(Boolean).join(' ');
    
    return baseClasses;

  }
}
