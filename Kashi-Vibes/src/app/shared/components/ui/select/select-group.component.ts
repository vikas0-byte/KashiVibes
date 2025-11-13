import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="select-group">
      <ng-content></ng-content>
    </div>
  `
})
export class SelectGroupComponent {}