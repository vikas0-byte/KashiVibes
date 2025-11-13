import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'app-tabs-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="computedClasses"
      (click)="onClick()"
      type="button"
      role="tab"
      [attr.data-state]="isActive ? 'active' : 'inactive'"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class TabsTriggerComponent {
  @Input() value = '';
  @Input() class = '';

  private tabsComponent = inject(TabsComponent);

  get isActive(): boolean {
    return this.tabsComponent.isTriggerActive(this.value);
  }

  get computedClasses() {
    return cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      this.isActive 
        ? 'bg-background text-foreground shadow-sm' 
        : 'hover:bg-background/50 hover:text-foreground',
      this.class
    );
  }

  onClick() {
    this.tabsComponent.setActiveTab(this.value);
  }
}
