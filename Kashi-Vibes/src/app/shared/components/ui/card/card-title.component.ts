import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'ui-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 [class]="computedClasses">
      <ng-content></ng-content>
    </h3>
  `
})
export class CardTitleComponent {
  @Input() class = '';

  get computedClasses() {
    return cn('text-2xl font-semibold leading-none tracking-tight', this.class);
  }
}