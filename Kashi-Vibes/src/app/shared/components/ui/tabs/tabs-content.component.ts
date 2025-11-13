import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'app-tabs-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="computedClasses"
      [class.hidden]="!isActive"
      role="tabpanel"
      [attr.data-state]="isActive ? 'active' : 'inactive'"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class TabsContentComponent {
  @Input() value = '';
  @Input() class = '';

  private tabsComponent = inject(TabsComponent);

  get isActive(): boolean {
    return this.tabsComponent.isTriggerActive(this.value);
  }

  get computedClasses() {
    return cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.class
    );
  }
}