import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'ui-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class CardFooterComponent {
  @Input() class = '';

  get computedClasses() {
    return cn('flex items-center p-6 pt-0', this.class);
  }
}