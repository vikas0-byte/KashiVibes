import { booleanAttribute, Component, HostBinding, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

const buttonVariants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline"
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10"
};

@Component({
  selector: 'app-button, button[app-button]',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [class]="computedClass()"
      [disabled]="disabled()"
      (click)="onClick.emit($event)"
      (blur)="onBlur.emit($event)"
      (focus)="onFocus.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
 // Input signals (Angular 19 style)
  variant = input<keyof typeof buttonVariants>('default');
  size = input<keyof typeof buttonSizes>('default');
  className = input<string>('');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
  asChild = input<boolean>(false); // For future Slot implementation

  // Output events
  onClick = output<Event>();
  onBlur = output<FocusEvent>();
  onFocus = output<FocusEvent>();

  // Computed class
   computedClass = () => {
    return cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      buttonVariants[this.variant()],
      buttonSizes[this.size()],
      this.className()
    );
  };

}