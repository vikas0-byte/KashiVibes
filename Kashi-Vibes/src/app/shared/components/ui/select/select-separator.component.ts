import { Component } from '@angular/core';

@Component({
  selector: 'app-select-separator',
  template: `<div class="select-separator"></div>`,
  styles: [`
    .select-separator {
      height: 1px;
      background-color: hsl(var(--border));
      margin: 0.25rem -0.25rem;
    }
  `],
  standalone: true
})
export class SelectSeparatorComponent {}