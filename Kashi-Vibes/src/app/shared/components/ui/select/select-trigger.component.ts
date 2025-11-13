import { Component } from '@angular/core';

@Component({
  selector: 'app-select-trigger',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  standalone: true
})
export class SelectTriggerComponent {}