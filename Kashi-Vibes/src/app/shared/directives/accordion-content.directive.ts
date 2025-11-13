import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnDestroy, Optional, effect } from '@angular/core';
import { AccordionItemComponent } from '../components/accordion/accordion-item/accordion-item.component';
import { AccordionService } from '../services/accordion.service';

@Directive({
  selector: '[appAccordionContent]',
  standalone: true
})
export class AccordionContentDirective implements AfterViewInit, OnDestroy {

  @Input() className: string = '';

  private contentHeight: string = '0px';
  private effectRef: any;

  constructor(
    @Optional() private accordionItem: AccordionItemComponent,
    private accordionService: AccordionService,
    private elementRef: ElementRef
  ) {
    
    this.effectRef = effect(() => {
      const openItems = this.accordionService.openItems();
      this.updateContentHeight();
    });
  }

  ngAfterViewInit(): void {
    this.updateContentHeight();

    // Set ARIA attributes
    if (this.accordionItem) {
      this.elementRef.nativeElement.id = `${this.accordionItem.itemId}-content`;
    }
  }

  @HostBinding('class')
  get hostClasses(): string {
    const isAnimated = this.accordionService.isAnimated();
    const baseClasses = [
      'accordion-content',
      'overflow-hidden transition-all duration-200',
      isAnimated ? 'accordion-content-animated' : '',
      this.className
    ].filter(Boolean).join(' ');

    return baseClasses;
  }

  @HostBinding('style.height')
  get contentHeightStyle(): string {
    return this.contentHeight;
  }

  @HostBinding('attr.aria-hidden')
  get ariaHidden(): boolean {
    return !this.accordionItem?.isOpen;
  }

  @HostBinding('attr.role') 
  get role(): string {
    return 'region'; 
  }

  private updateContentHeight(): void {
    if (this.accordionItem?.isOpen) {
      const nativeElement = this.elementRef.nativeElement;
      const scrollHeight = nativeElement.scrollHeight;
      this.contentHeight = `${scrollHeight}px`; 

      // After animation completes, set to auto for dynamic content changes
      if (this.accordionService.isAnimated()) {
        setTimeout(() => {
          if (this.accordionItem?.isOpen) {
            this.contentHeight = 'auto';
          }
        }, this.accordionService.animationDuration());
      }
    } else {
      this.contentHeight = '0px';
    }
  }

  ngOnDestroy(): void {
    if (this.effectRef) {
      this.effectRef.destroy();
    }
  }
}