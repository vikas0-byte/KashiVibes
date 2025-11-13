import { Component, input, output, booleanAttribute, signal, computed, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { cn } from '../../../utils/cn';

// Dialog Root Component
@Component({
  selector: 'app-dialog',
  standalone: true,
  template: `<ng-content></ng-content>`
})
export class DialogComponent {
  open = input<boolean>(false);
  openChange = output<boolean>();
}

// Dialog Overlay Component
@Component({
  selector: 'app-dialog-overlay',
  standalone: true,
  template: `
    <div 
      [class]="computedClass()"
      [attr.data-state]="dialogOpen() ? 'open' : 'closed'"
    >
    </div>
  `
})
export class DialogOverlayComponent {
  className = input<string>('');
  dialogOpen = input<boolean>(false);

  computedClass = () => cn(
    "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    this.className()
  );
}

// Dialog Content Component
@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [CommonModule, DialogOverlayComponent],
  template: `
    <app-dialog-overlay [dialogOpen]="dialogOpen()" />
    <div
      [class]="computedClass()"
      [attr.data-state]="dialogOpen() ? 'open' : 'closed'"
    >
      <ng-content></ng-content>
      <button
        (click)="onClose()"
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
        <span class="sr-only">Close</span>
      </button>
    </div>
  `
})
export class DialogContentComponent {
  className = input<string>('');
  dialogOpen = input<boolean>(false);
  close = output<void>();

  computedClass = () => cn(
    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
    this.className()
  );

  onClose() {
    this.close.emit();
  }
}

// Dialog Header Component
@Component({
  selector: 'app-dialog-header',
  standalone: true,
  template: `
    <div [class]="computedClass()">
      <ng-content></ng-content>
    </div>
  `
})
export class DialogHeaderComponent {
  className = input<string>('');

  computedClass = () => cn(
    "flex flex-col space-y-1.5 text-center sm:text-left",
    this.className()
  );
}

// Dialog Footer Component
@Component({
  selector: 'app-dialog-footer',
  standalone: true,
  template: `
    <div [class]="computedClass()">
      <ng-content></ng-content>
    </div>
  `
})
export class DialogFooterComponent {
  className = input<string>('');

  computedClass = () => cn(
    "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    this.className()
  );
}

// Dialog Title Component
@Component({
  selector: 'app-dialog-title',
  standalone: true,
  template: `
    <h3 [class]="computedClass()">
      <ng-content></ng-content>
    </h3>
  `
})
export class DialogTitleComponent {
  className = input<string>('');

  computedClass = () => cn(
    "text-lg font-semibold leading-none tracking-tight",
    this.className()
  );
}

// Dialog Description Component
@Component({
  selector: 'app-dialog-description',
  standalone: true,
  template: `
    <p [class]="computedClass()">
      <ng-content></ng-content>
    </p>
  `
})
export class DialogDescriptionComponent {
  className = input<string>('');

  computedClass = () => cn(
    "text-sm text-muted-foreground",
    this.className()
  );
}

// Barrel exports for easy imports
export {
  DialogComponent as Dialog,
  DialogOverlayComponent as DialogOverlay,
  DialogContentComponent as DialogContent,
  DialogHeaderComponent as DialogHeader,
  DialogFooterComponent as DialogFooter,
  DialogTitleComponent as DialogTitle,
  DialogDescriptionComponent as DialogDescription,
};