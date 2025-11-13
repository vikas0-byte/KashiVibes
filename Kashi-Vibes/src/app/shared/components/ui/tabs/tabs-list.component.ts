import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'app-tabs-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses" role="tablist">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsListComponent {
  @Input() class = '';

  get computedClasses() {
    return cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      this.class
    );
  }
}