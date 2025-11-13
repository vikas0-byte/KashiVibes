import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative flex w-full touch-none select-none items-center">
      <div class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <div 
          class="absolute h-full bg-primary"
          [style.width.%]="position"
        ></div>
      </div>
      <div
        class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        [class]="thumbClasses"
        [style.left.%]="position"
        (mousedown)="startDrag($event)"
        [attr.aria-valuenow]="value"
        [attr.aria-valuemin]="min"
        [attr.aria-valuemax]="max"
      ></div>
    </div>
  `
})
export class SliderComponent {
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() className: string = '';

  @Output() valueChange = new EventEmitter<number>();

  get position(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  get thumbClasses(): string {
    return `cursor-grab active:cursor-grabbing ${this.disabled ? 'pointer-events-none opacity-50' : ''}`;
  }

  startDrag(event: MouseEvent): void {
    if (this.disabled) return;
    
    const moveHandler = (moveEvent: MouseEvent) => {
      const rect = (event.target as HTMLElement).closest('div')!.getBoundingClientRect();
      const percentage = (moveEvent.clientX - rect.left) / rect.width;
      const rawValue = this.min + percentage * (this.max - this.min);
      const steppedValue = Math.round(rawValue / this.step) * this.step;
      const clampedValue = Math.max(this.min, Math.min(this.max, steppedValue));
      
      this.value = clampedValue;
      this.valueChange.emit(this.value);
    };

    const upHandler = () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  }
}