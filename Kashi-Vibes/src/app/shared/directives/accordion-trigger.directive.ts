import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, Optional } from '@angular/core';
import { AccordionItemComponent } from '../components/accordion/accordion-item/accordion-item.component';

@Directive({
  selector: '[appAccordionTrigger]',
  standalone: true,
  host: {
    role: 'button',
    tabinedex: '0'
  }
})
export class AccordionTriggerDirective implements AfterViewInit {
  @Input() className: string = '';

  private parentItem: AccordionItemComponent | null = null;

  constructor(
    @Optional() private accordionItem: AccordionItemComponent,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.findParentItem();
  }

  @HostBinding('class')
  get hostClasses(): string {
    const baseClasses = [
      'accordion-trigger',
      'flex items-center justify-between w-full py-4 font-medium transition-all',
      'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-200',
      this.accordionItem?.isOpen ? 'accordion-trigger-open' : 'accordion-trigger-closed',
      this.className
    ].filter(Boolean).join(' ');

    return baseClasses;
  }

  @HostBinding('attr.aria-controls')
  get ariaControls(): string {
    return this.accordionItem ? `${this.accordionItem.itemId}-content` : '';
  }

  @HostListener('click')
  onClick(): void {
    this.toggle();
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  onKeydown(): void {
    this.toggle();
  }

  private toggle(): void {
    if (this.accordionItem && !this.accordionItem.disabled) {
      this.accordionItem.toggle();
    }
  }

  private findParentItem(): void {
    if (!this.accordionItem) {
      let parent = this.elementRef.nativeElement.parentElement;
      while (parent && !this.accordionItem) {
        if (parent.hasAttribute('data-item-id')) {
          break;
        }
        parent = parent.parentElement;
      }
    }
  }
}
