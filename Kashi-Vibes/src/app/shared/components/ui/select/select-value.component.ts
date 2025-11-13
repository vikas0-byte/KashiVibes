import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-value',
  template: `{{ placeholder }}`,
  styles: [`
    :host {
      display: block;
    }
  `],
  standalone: true
})
export class SelectValueComponent {
  @Input() placeholder = '';
}