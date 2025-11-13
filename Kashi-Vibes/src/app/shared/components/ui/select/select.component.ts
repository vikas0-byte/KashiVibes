import { Component, forwardRef, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, ElementRef, ViewChild, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectItemComponent } from './select-item.component';

@Component({
  selector: 'app-select',
  template: `
    <div class="relative w-full" [class.disabled]="disabled">
      <div 
        #trigger
        class="select-trigger"
        [class.open]="isOpen"
        [class.disabled]="disabled"
        (click)="toggleOpen()"
        role="combobox"
        [attr.aria-expanded]="isOpen"
        [attr.aria-disabled]="disabled"
      >
        <span class="select-value">
          {{ displayValue || placeholder }}
        </span>
        <span class="select-icon" [class.rotate-180]="isOpen">
          ▼
        </span>
      </div>

      <div 
        #content
        class="select-content"
        [class.open]="isOpen"
        [class.above]="position === 'above'"
        *ngIf="isOpen"
      >
        <div class="select-viewport">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .select-trigger {
      display: flex;
      height: 2.5rem;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      border-radius: 0.375rem;
      border: 1px solid hsl(var(--input));
      background: hsl(var(--background));
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      user-select: none;
    }

    .select-trigger:hover:not(.disabled) {
      opacity: 0.9;
      background-color: hsl(var(--accent) / 0.05);
    }

    .select-trigger:focus-visible {
      outline: 2px solid hsl(var(--ring));
      outline-offset: 2px;
    }

    .select-trigger.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .select-value {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .select-icon {
      transition: transform 0.2s ease-in-out;
      opacity: 0.5;
      font-size: 0.875rem;
    }

    .select-icon.rotate-180 {
      transform: rotate(180deg);
    }

    .select-content {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 50;
      max-height: 16rem; /* Increased height for better scroll */
      overflow-y: auto; /* Enable vertical scrolling */
      overflow-x: hidden;
      border-radius: 0.375rem;
      border: 1px solid hsl(var(--border));
      background: hsl(var(--popover));
      color: hsl(var(--popover-foreground));
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      margin-top: 0.25rem;
      transform-origin: top;
      animation: select-content-show 0.2s ease-out;
    }

    .select-content.above {
      top: auto;
      bottom: 100%;
      margin-top: 0;
      margin-bottom: 0.25rem;
      transform-origin: bottom;
    }

    .select-content.open {
      display: block;
    }

    /* Scrollbar Styling */
    .select-content::-webkit-scrollbar {
      width: 6px;
    }

    .select-content::-webkit-scrollbar-track {
      background: hsl(var(--muted));
      border-radius: 0 0.375rem 0.375rem 0;
    }

    .select-content::-webkit-scrollbar-thumb {
      background: hsl(var(--border));
      border-radius: 3px;
    }

    .select-content::-webkit-scrollbar-thumb:hover {
      background: hsl(var(--border) / 0.8);
    }

    .select-viewport {
      padding: 0.25rem;
    }

    @keyframes select-content-show {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    :host {
      display: block;
      width: 100%;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [CommonModule]
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit, OnDestroy {
  @Input() value: any;
  @Input() placeholder = 'Select an option';
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<any>();

  @ViewChild('trigger') trigger!: ElementRef<HTMLElement>;
  @ViewChild('content') content!: ElementRef<HTMLElement>;
  @ContentChildren(SelectItemComponent) items!: QueryList<SelectItemComponent>;

  isOpen = false;
  position: 'above' | 'below' = 'below';
  displayValue = '';

  private onChange = (value: any) => {};
  private onTouched = () => {};
  private clickListener?: (event: Event) => void;

  ngAfterContentInit() {
    this.updateDisplayValue();

    this.updateItemsSelection();
    
    this.items.changes.subscribe(() => {
      this.updateDisplayValue();
    });
  }

  toggleOpen() {
    if (this.disabled) return;
    
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.calculatePosition();
      setTimeout(() => {
        this.addClickListener();
        this.scrollToSelectedItem();
      });
    } else {
      this.removeClickListener();
    }
  }

  private calculatePosition() {
    const trigger = this.trigger.nativeElement;
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    this.position = spaceBelow < 200 && spaceAbove > spaceBelow ? 'above' : 'below';
  }

  private scrollToSelectedItem() {
    if (this.content && this.items) {
      setTimeout(() => {
        const selectedItem = this.items.find(item => item.value === this.value);
        if (selectedItem) {
          const element = selectedItem['elementRef'].nativeElement;
          element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    }
  }

  private addClickListener() {
    this.clickListener = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!this.trigger.nativeElement.contains(target) && 
          !this.content?.nativeElement.contains(target)) {
        this.isOpen = false;
        this.removeClickListener();
      }
    };
    document.addEventListener('click', this.clickListener);
  }

  private removeClickListener() {
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
      this.clickListener = undefined;
    }
  }

  selectItem(value: any, label: string) {
    this.value = value;
    this.displayValue = label;
    this.isOpen = false;
    this.removeClickListener();
    
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
    
    // Update all items selection state
    this.updateItemsSelection();
  }

  private updateItemsSelection() {
    if (this.items) {
      this.items.forEach(item => {
        item.updateSelection();
      });
    }
  }

  private updateDisplayValue() {
    if (!this.items || !this.value) {
      this.displayValue = '';
      return;
    }

    const selectedItem = this.items.find(item => item.value === this.value);
    if (selectedItem) {
      this.displayValue = selectedItem.getLabel();
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateDisplayValue();
    
    // Update items selection state
    this.updateItemsSelection();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    this.removeClickListener();
  }
}