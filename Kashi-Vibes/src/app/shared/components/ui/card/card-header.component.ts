import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'ui-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class CardHeaderComponent {
  @Input() class = '';

  get computedClasses() {
    return cn('flex flex-col space-y-1.5 py-6', this.class);
  }
}