import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Phone, Mail, MessageCircle, Sparkles, LucideAngularModule } from 'lucide-angular';
import { ButtonComponent } from '../../../../shared/components/button/button/button.component';

@Component({
  selector: 'app-calltoaction',
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  templateUrl: './calltoaction.component.html',
  styleUrl: './calltoaction.component.css'
})
export class CalltoactionComponent {
  @Output() onCustomJourney = new EventEmitter<void>();

  // Lucide Icons
  readonly phoneIcon = Phone;
  readonly mailIcon = Mail;
  readonly messageCircleIcon = MessageCircle;
  readonly sparklesIcon = Sparkles;

  onCustomButtonClick() {
    console.log('Create Custom Package button clicked in CalltoactionComponent');
    this.onCustomJourney.emit();
  }
}
