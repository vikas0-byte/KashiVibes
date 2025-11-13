import { Component, Input, output, contentChildren, AfterContentInit, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsTriggerComponent } from './tabs-trigger.component';
import { TabsContentComponent } from './tabs-content.component';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClasses">
      <ng-content select="app-tabs-list"></ng-content>
      <ng-content></ng-content>
    </div>
  `
})
export class TabsComponent implements AfterContentInit {
  @Input() value = '';
  @Input() class = '';
  
  valueChange = output<string>();
  
  triggers =contentChildren(TabsTriggerComponent);

  get computedClasses() {
    return cn('w-full', this.class);
  }

  ngAfterContentInit() {
    console.log('TabsComponent - ViewChildren Triggers:', this.triggers.length);

    // Set initial active tab
    if (this.triggers().length > 0 && !this.value) {
      this.value = this.triggers()[0].value;
      console.log('TabsComponent - Set initial value to:', this.value);
    }
  }

  setActiveTab(value: string) {
    console.log('TabsComponent - Setting active tab:', value);
    this.value = value;
    this.valueChange.emit(value);
  }

  isTriggerActive(triggerValue: string): boolean {
    return this.value === triggerValue;
  }
}