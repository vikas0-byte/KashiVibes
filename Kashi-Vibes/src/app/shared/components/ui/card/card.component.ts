import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';


@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() class = '';

  get computedClasses() {
    return cn(
      'rounded-lg border !bg-card text-card-foreground shadow-sm',
      this.class
    );
  }
}