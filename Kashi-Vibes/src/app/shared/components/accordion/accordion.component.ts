import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, QueryList } from '@angular/core';
import { AccordionContextService } from '../../services/accordion-context.service';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { Subscription } from 'rxjs';
import { AccordionService } from '../../services/accordion.service';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [],
  template: `
    <div [class]="hostClasses" [attr.data-accordion-type]="type" role="presentation">
      <ng-content></ng-content>
    </div>
  `,
  providers: [AccordionContextService],
  host: { class: 'w-full block'}
})
export class AccordionComponent implements AfterContentInit, OnDestroy {
  @Input() type: 'single' | 'multiple' = 'single';
  @Input() animated: boolean = true;
  @Input() animationDuration: number = 200;
  @Input() className: string = '';

  @ContentChildren(AccordionItemComponent) accordionItems!: QueryList<AccordionItemComponent>;

  private itemSubScriptions = new Subscription();

  constructor(
    private accordionContext: AccordionContextService,
    private accordionService: AccordionService
  ) {}

  ngOnInit() {
    this.accordionContext.updateConfig({
      type: this.type,
      animated: this.animated,
      animationDuration: this.animationDuration,
      className: this.className
    });
  }

  ngAfterContentInit(): void {
    // watch for item changes
    this.accordionItems.changes.subscribe(() => this.watchItems());
    this.watchItems();
  }

  private watchItems(): void {
    // clear previous subscription
    this.itemSubScriptions.unsubscribe();
    this.itemSubScriptions = new Subscription();

    //subscribe to each item's events
    this.accordionItems.forEach(item => {
      const sub = item.itemToggled.subscribe(() => {
        this.onItemToggled(item.itemId);
      });
      this.itemSubScriptions.add(sub);
    });
  }

  private onItemToggled(itemId: string): void {
    this.accordionService.toggleItem(itemId);
  }

  get hostClasses(): string {
    return `accordion ${this.className}`.trim();
  }

  // public api methods

  openItem(itemId: string): void {
    this.accordionService.openItem(itemId);
  }

  closeItem(itemId: string): void {
    this.accordionService.closeItem(itemId);
  }

  closeAll(): void {
    this.accordionService.closeAll();
  }

  ngOnDestroy(): void {
    this.itemSubScriptions.unsubscribe();
  }
}
