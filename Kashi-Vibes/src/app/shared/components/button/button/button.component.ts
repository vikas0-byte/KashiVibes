import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'default' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'glassmorphism' | 'hero'
export type ButtonSize = 'sm' | 'default' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClasses"
      [attr.type]="type"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  host: {
    '[class]': '"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"'
  }
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() size: ButtonSize = 'default';
  @Input() className = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;

  get buttonClasses(): string {
    const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      hero: "bg-gradient-primary text-white hover:bg-gradient-secondary shadow-divine hover:shadow-glow border-0 font-semibold",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      glassmorphism: "bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white/20 hover:border-white/30 shadow-soft"
    };

    const sizes = {
      sm: 'h-9 rounded-md px-3',
      default: 'h-10 px-4 py-2',
      lg: 'h-11 rounded-md px-8'
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]} ${this.className}`.trim();
  }
}