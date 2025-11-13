import { AfterViewInit, Component, effect, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Optional, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccordionContextService } from '../../../services/accordion-context.service';
import { AccordionService } from '../../../services/accordion.service';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [],
  template: `
    <div [class]="hostClasses" [attr.data-state]="isOpen ? 'open' : 'closed'" role="heading" [attr.aria-level]="ariaLevel">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[attr.data-item-id]': 'itemId',
    '[attr.aria-expanded]': 'isOpen',
    '[attr.aria-disabled]': 'disabled'
  },
  styles: ``
})
export class AccordionItemComponent implements AfterViewInit, OnDestroy{
  @Input() itemId!: string;
  @Input() ariaLevel: number = 3;
  @Input() disabled: boolean = false;
  @Input() className: string= '';
  
  @Output() itemToggled = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen: boolean = false;

  private effectRef: any;

  constructor (
    @Optional() private accordianContext: AccordionContextService,
    private accordionService: AccordionService,
    private elementref: ElementRef
  ) {
    if (!this.accordianContext) {
      throw new Error('AccordionItem must be used inside an Accordion component');
    }

    // effect to state changes

    this.effectRef = effect(() => {
      const openItems = this.accordionService.openItems();
      const wasOpen = this.isOpen;
      this.isOpen = openItems.has(this.itemId);

      // Emit events on state change

      if (!wasOpen && this.isOpen) {
        this.opened.emit();
      } else if (wasOpen && !this.isOpen) {
        this.closed.emit();
      }
    });
  }

  ngAfterViewInit(): void {
     // generate id if not provided
    if (!this.itemId) {
      this.itemId = this.generateId();
    }
  }

  toggle(): void {
    if (!this.disabled) {
      this.itemToggled.emit();
    }
  }

  open(): void {
    if (!this.disabled) {
      this.accordionService.openItem(this.itemId);
    }
  }

  close(): void {
    this.accordionService.closeItem(this.itemId);
  }

  @HostBinding('class')
  get hostClasses(): string {
    const baseClasses = [
      'accordion-item',
      this.isOpen ? 'accordion-item-open' : 'accordion-item-closed',
      this.disabled ? 'accordion-item-disabled' : '',
      this.className
    ]. filter(Boolean).join(' ');

    return baseClasses;
  }

  private generateId(): string {
    return `accordion-item-${Math.random().toString(36).substr(2, 9)}`;
  }

  ngOnDestroy(): void {
    if (this.effectRef)  {
      this.effectRef.destroy();
    }
  }
}
