// card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() className = '';

  get computedClasses(): string {
    return `rounded-lg border bg-card text-card-foreground shadow-sm ${this.className}`.trim();
  }
}