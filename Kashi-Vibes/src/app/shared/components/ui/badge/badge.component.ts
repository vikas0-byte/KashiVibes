import { 
  Component, 
  Input, 
  booleanAttribute,
  output,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeVariant, BadgeSize, BADGE_VARIANTS, BADGE_SIZES } from './badge.model';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css'],
  host: {
    '[class]': 'computedClasses',
    '[attr.role]': 'isClickable ? "button" : null',
    '[tabIndex]': 'isClickable ? 0 : null',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleKeydown($event)',
    '(keydown.space)': 'handleKeydown($event)'
  }
})
export class BadgeComponent implements OnChanges {
  // Input properties
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';
  @Input({ transform: booleanAttribute }) isClickable: boolean = false;
  @Input({ transform: booleanAttribute }) isPill: boolean = true;
  @Input() customClass: string = '';
  @Input() icon?: string;
  @Input({ transform: booleanAttribute }) showClose: boolean = false;
  
  // Output events
  onClick = output<MouseEvent>();
  onAction = output<void>();
  onClose = output<void>();

  private baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    // Log changes for debugging in development
    // if (changes['variant'] || changes['size']) {
    //   console.log('Badge properties changed:', changes);
    // }
  }

  get computedClasses(): string {
    return cn(
      this.baseClasses,
      BADGE_VARIANTS[this.variant],
      BADGE_SIZES[this.size],
      {
        'rounded-full': this.isPill,
        'rounded-md': !this.isPill,
        'cursor-pointer hover:scale-105 active:scale-95': this.isClickable,
        'cursor-default': !this.isClickable,
        'pl-2': this.icon // Add padding if icon is present
      },
      this.customClass
    );
  }

  handleClick(event: MouseEvent) {
    if (this.isClickable) {
      this.onClick.emit(event);
      this.onAction.emit();
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (this.isClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.onAction.emit();
    }
  }

  // Public method for programmatic control
  focus(): void {
    this.elementRef.nativeElement.focus();
  }
}