import { Component, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { SelectComponent } from './select.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-item',
  template: `
    <div 
      class="select-item"
      [class.selected]="isSelected"
      [class.disabled]="disabled"
      [class.focused]="isFocused"
    >
      <span class="check-icon" *ngIf="isSelected">✓</span>
      <span class="item-text"><ng-content></ng-content></span>
    </div>
  `,
  styles: [`
    .select-item {
      position: relative;
      display: flex;
      width: 100%;
      cursor: pointer;
      user-select: none;
      align-items: center;
      border-radius: 0.25rem;
      padding: 0.5rem 2rem 0.5rem 2rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      outline: none;
      transition: all 0.2s ease-in-out;
      background: transparent;
    }

    /* DEFAULT - No background */
    .select-item:not(.selected):not(:hover):not(.focused) {
      background: transparent !important;
      color: inherit;
    }

    /* HOVER EFFECT */
    .select-item:hover:not(.disabled),
    .select-item.focused:not(.disabled) {
      opacity: 0.9;
      background-color: hsl(var(--accent) / 0.1);
    }

    /* SELECTED - Only show background when actually selected */
    .select-item.selected {
      background-color: hsl(var(--accent) / 0.08);
      font-weight: 500;
    }

    .select-item.disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    .check-icon {
      position: absolute;
      left: 0.5rem;
      display: flex;
      height: 0.875rem;
      width: 0.875rem;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      color: hsl(var(--primary));
    }

    .item-text {
      flex: 1;
    }

    :host {
      display: block;
      width: 100%;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class SelectItemComponent implements OnInit, OnDestroy {
  @Input() value: any;
  @Input() disabled = false;

  isSelected = false;
  isFocused = false;

  constructor(
    private parent: SelectComponent,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // Initial selection state
    this.updateSelection();
    
    // Subscribe to value changes from parent
    this.parent.valueChange.subscribe(() => {
      this.updateSelection();
    });
  }

  @HostListener('click')
  onClick() {
    if (this.disabled) return;
    
    const label = this.getLabel();
    this.parent.selectItem(this.value, label);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isFocused = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isFocused = false;
  }

  // Public method to update selection state
  updateSelection() {
    // Strict comparison - sirf tabhi selected hoga jab exact match ho
    this.isSelected = this.parent.value === this.value;
  }

  getLabel(): string {
    return this.elementRef.nativeElement.textContent?.trim() || '';
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}