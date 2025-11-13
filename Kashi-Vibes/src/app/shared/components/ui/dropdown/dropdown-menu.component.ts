import { Component, input, output, booleanAttribute, signal, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  template: `<ng-content></ng-content>`
})
export class DropdownMenuComponent {
  open = signal<boolean>(false);

  toggle() {
    this.open.update(val => !val);
  }

  close() {
    this.open.set(false);
  }
}

@Component({
  selector: 'app-dropdown-menu-trigger',
  standalone: true,
  template: `
    <div (click)="onClick.emit($event)">
      <ng-content></ng-content>
    </div>
  `
})
export class DropdownMenuTriggerComponent {
  onClick = output<Event>();
}

@Component({
  selector: 'app-dropdown-menu-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="dropdownOpen()"
      [class]="computedClass()"
      [style]="positionStyle()"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class DropdownMenuContentComponent {
  className = input<string>('');
  sideOffset = input<number>(4);
  align = input<'start' | 'center' | 'end'>('center');
  
  dropdownOpen = input<boolean>(false);
  
  positionStyle = signal<string>('');

  computedClass = () => cn(
    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    this.className()
  );
}

@Component({
  selector: 'app-dropdown-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="computedClass()"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class DropdownMenuItemComponent {
  className = input<string>('');
  inset = input<boolean, unknown>(false, { transform: booleanAttribute });
  onClick = output<Event>();

  computedClass = () => cn(
    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
    this.inset() && "pl-8",
    this.className()
  );
}

@Component({
  selector: 'app-dropdown-menu-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClass()">
      <ng-content></ng-content>
    </div>
  `
})
export class DropdownMenuLabelComponent {
  className = input<string>('');
  inset = input<boolean, unknown>(false, { transform: booleanAttribute });

  computedClass = () => cn(
    "px-2 py-1.5 text-sm font-semibold",
    this.inset() && "pl-8",
    this.className()
  );
}

@Component({
  selector: 'app-dropdown-menu-separator',
  standalone: true,
  template: `
    <div [class]="computedClass()"></div>
  `
})
export class DropdownMenuSeparatorComponent {
  className = input<string>('');

  computedClass = () => cn(
    "-mx-1 my-1 h-px bg-muted",
    this.className()
  );
}

export {
  DropdownMenuComponent as DropdownMenu,
  DropdownMenuTriggerComponent as DropdownMenuTrigger,
  DropdownMenuContentComponent as DropdownMenuContent,
  DropdownMenuItemComponent as DropdownMenuItem,
  DropdownMenuLabelComponent as DropdownMenuLabel,
  DropdownMenuSeparatorComponent as DropdownMenuSeparator,
};