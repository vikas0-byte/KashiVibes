import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'ui-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class CardContentComponent {
  @Input() class = '';

  get computedClasses() {
    return cn('p-6 pt-0', this.class);
  }
}