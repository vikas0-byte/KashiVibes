import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-separator',
  standalone: true,
  imports: [CommonModule],
  template: ``, // Empty template since we're using host binding for everything
  host: {
    '[class]': 'getSeparatorClasses()',
    '[attr.aria-orientation]': 'orientation',
    '[attr.role]': 'decorative ? "none" : "separator"',
    '[attr.data-orientation]': 'orientation'
  }
})
export class SeparatorComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() decorative: boolean = true;
  @Input() class: string = '';

  @HostBinding('attr.data-orientation')
  get dataOrientation() {
    return this.orientation;
  }

  getSeparatorClasses(): string {
    const baseClasses = 'shrink-0 bg-border';
    
    const orientationClass = this.orientation === 'horizontal' 
      ? 'h-[1px] w-full' 
      : 'h-full w-[1px]';

    return `${baseClasses} ${orientationClass} ${this.class}`.trim();
  }
}