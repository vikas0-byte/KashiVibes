import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [class]="computedClass()"
    >
      <ng-content></ng-content>
    </span>
  `
})
export class AvatarComponent {
  className = input<string>('');

  computedClass = () => cn(
    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    this.className()
  );
}

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img 
      [class]="computedClass()"
      [src]="src()"
      [alt]="alt()"
    />
  `
})
export class AvatarImageComponent {
  className = input<string>('');
  src = input<string>('');
  alt = input<string>('');

  computedClass = () => cn(
    "aspect-square h-full w-full",
    this.className()
  );
}

@Component({
  selector: 'app-avatar-fallback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="computedClass()"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class AvatarFallbackComponent {
  className = input<string>('');

  computedClass = () => cn(
    "flex h-full w-full items-center justify-center rounded-full bg-muted",
    this.className()
  );
}

export {
  AvatarComponent as Avatar,
  AvatarImageComponent as AvatarImage,
  AvatarFallbackComponent as AvatarFallback,
};