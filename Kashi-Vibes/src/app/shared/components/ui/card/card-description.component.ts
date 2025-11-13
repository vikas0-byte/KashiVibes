import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'ui-card-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p [class]="computedClasses">
      <ng-content></ng-content>
    </p>
  `
})
export class CardDescriptionComponent {
  @Input() class = '';

  get computedClasses() {
    return cn('text-sm text-muted-foreground', this.class);
  }
}