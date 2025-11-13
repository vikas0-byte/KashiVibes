import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class SelectLabelComponent {
  @Input() className: string = '';

  get computedClasses(): string {
    return `py-1.5 pl-8 pr-2 text-sm font-semibold ${this.className}`.trim();
  }
}