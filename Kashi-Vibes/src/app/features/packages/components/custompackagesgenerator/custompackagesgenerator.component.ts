import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  Calendar,
  CheckCircle,
  IndianRupee,
  LucideAngularModule,
  MapPin,
  Plus,
  Sparkles,
  Users,
  X,
} from 'lucide-angular';
import { ButtonComponent } from '../../../../shared/components/button/button/button.component';
import { BadgeComponent } from '../../../../shared/components/ui/badge/badge.component';
import { LabelComponent } from '../../../../shared/components/ui/label/label.component';
import { InputComponent } from '../../../../shared/components/ui/input/input.component';
import { SelectComponent, SelectContentComponent,  SelectItemComponent, SelectTriggerComponent, SelectValueComponent } from '../../../../shared/components/ui/select';
import { TextareaComponent } from '../../../../shared/components/ui/textarea/textarea.component';

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

interface FormData {
  destinations: string[];
  duration: string;
  travelers: string;
  budget: string;
  interests: string[];
  accommodation: string;
  transport: string;
  specialRequests: string;
  contactInfo: ContactInfo;
}

@Component({
  selector: 'app-custompackagesgenerator',
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    LabelComponent,
    SelectComponent,
    SelectContentComponent,
    SelectItemComponent,
    SelectTriggerComponent,
    TextareaComponent,
    SelectValueComponent,
    InputComponent
  ],
  templateUrl: './custompackagesgenerator.component.html',
  styleUrl: './custompackagesgenerator.component.css',
})
export class CustompackagesgeneratorComponent {
  @Output() onClose = new EventEmitter<void>();

  // Lucide Icons
  readonly xIcon = X;
  readonly mapPinIcon = MapPin;
  readonly calendarIcon = Calendar;
  readonly usersIcon = Users;
  readonly indianRupeeIcon = IndianRupee;
  readonly sparklesIcon = Sparkles;
  readonly checkCircleIcon = CheckCircle;
  readonly plusIcon = Plus;

  // Signals for state management (React ke useState jaisa)
  step = signal(1);
  formData = signal<FormData>({
    destinations: [],
    duration: '',
    travelers: '',
    budget: '',
    interests: [],
    accommodation: '',
    transport: '',
    specialRequests: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  // Individual signals for two-way binding
  durationValue = signal<string>('');
travelersValue = signal<string>('');
budgetValue = signal<string>('');
accommodationValue = signal<string>('');
specialRequestsValue = signal<string>('');
contactNameValue = signal<string>('');
contactEmailValue = signal<string>('');
contactPhoneValue = signal<string>('');


  // Constants
  destinations = [
    'Varanasi',
    'Ayodhya',
    'Bodhgaya',
    'Prayagraj',
    'Vindhyachal',
    'Mathura',
    'Vrindavan',
    'Rishikesh',
    'Haridwar',
    'Kedarnath',
  ];

  interests = [
    'Temple visits',
    'River ceremonies',
    'Meditation',
    'Local food',
    'Cultural shows',
    'Shopping',
    'Photography',
    'History tours',
    'Yoga sessions',
    'Music & dance',
    'Street food',
    'Boat rides',
  ];

  constructor() {
    // Form data updates ko track karna
    this.setupFormUpdates();
  }

  private setupFormUpdates() {
    // Jab individual values change ho, formData ko update karo
    // Angular 19 me effect use kar sakte hain
    // For simplicity, direct assignment use kar rahe hain methods me
  }

  onDurationChange(value: string | null) {
    this.durationValue.set(value || '');
    this.updateFormData();
  }

  onTravelersChange(value: string | null) {
    this.travelersValue.set(value || '');
    this.updateFormData();
  }

  onBudgetChange(value: string | null) {
    this.budgetValue.set(value || '');
    this.updateFormData();
  }

  onAccommodationChange(value: string | null) {
    this.accommodationValue.set(value || '');
    this.updateFormData();
  }

  // Destination toggle handler
  handleDestinationToggle(destination: string) {
    const currentDestinations = this.formData().destinations;
    const updatedDestinations = currentDestinations.includes(destination)
      ? currentDestinations.filter((d) => d !== destination)
      : [...currentDestinations, destination];

    this.formData.update((prev) => ({
      ...prev,
      destinations: updatedDestinations,
    }));
  }

  // Interest toggle handler
  handleInterestToggle(interest: string) {
    const currentInterests = this.formData().interests;
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest];

    this.formData.update((prev) => ({
      ...prev,
      interests: updatedInterests,
    }));
  }

  // Step navigation
  nextStep() {
    if (this.step() < 4) {
      // Current step ke data ko update karo
      this.updateFormDataFromCurrentStep();
      this.step.update((s) => s + 1);
    }
  }

  prevStep() {
    if (this.step() > 1) {
      this.step.update((s) => s - 1);
    }
  }

  // Form data ko current step ke values se update krne ke liye
  private updateFormDataFromCurrentStep() {
    if (this.step() === 2) {
      this.formData.update((prev) => ({
        ...prev,
        duration: this.durationValue(),
        travelers: this.travelersValue(),
        budget: this.budgetValue(),
        accommodation: this.accommodationValue(),
      }));
    } else if (this.step() === 3) {
      this.formData.update((prev) => ({
        ...prev,
        specialRequests: this.specialRequestsValue(),
      }));
    } else if (this.step() === 4) {
      this.formData.update((prev) => ({
        ...prev,
        contactInfo: {
          name: this.contactNameValue(),
          email: this.contactEmailValue(),
          phone: this.contactPhoneValue(),
        },
      }));
    }
  }

  private updateFormData() {
    this.formData.update(prev => ({
      ...prev,
      duration: this.durationValue(),
      travelers: this.travelersValue(),
      budget: this.budgetValue(),
      accommodation: this.accommodationValue(),
    }));
  }

  // Submit handler
  handleSubmit() {
    this.updateFormDataFromCurrentStep();
    console.log('Custom package request:', this.formData());
    this.onClose.emit();
  }

  // Validation methods
  isNextDisabled(): boolean {
    const currentStep = this.step();

    if (currentStep === 1) {
      return this.formData().destinations.length === 0;
    } else if (currentStep === 2) {
      return (
        !this.durationValue() || !this.travelersValue() || !this.budgetValue()
      );
    }

    return false;
  }

  isSubmitDisabled(): boolean {
    return (
      !this.contactNameValue() ||
      !this.contactEmailValue() ||
      !this.contactPhoneValue()
    );
  }

  //placeholder methods

  getDurationPlaceholder(): string {
    return this.durationValue() ? '' : 'Select duration';
  }

  getTravelersPlaceholder(): string {
    return this.travelersValue() ? '' : 'Select travelers';
  }

  getBudgetPlaceholder(): string {
    return this.budgetValue() ? '' : 'Select budget';
  }

  getAccommodationPlaceholder(): string {
    return this.accommodationValue() ? '' : 'Select accommodation';
  }

  // CSS class methods
  getStepClass(stepNum: number): string {
    const baseClasses =
      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium';
    return stepNum <= this.step()
      ? `${baseClasses} bg-primary text-primary-foreground`
      : `${baseClasses} bg-muted text-muted-foreground`;
  }

  getStepLineClass(stepNum: number): string {
    return stepNum < this.step() ? 'bg-primary' : 'bg-muted';
  }

  getDestinationClass(destination: string): string {
    const baseClasses = 'p-4 border-2 rounded-lg cursor-pointer transition-all';
    return this.formData().destinations.includes(destination)
      ? `${baseClasses} border-primary bg-primary/5`
      : `${baseClasses} border-muted hover:border-primary/50`;
  }

  getInterestClass(interest: string): string {
    const baseClasses =
      'p-3 border rounded-lg cursor-pointer transition-all text-center';
    return this.formData().interests.includes(interest)
      ? `${baseClasses} border-primary bg-primary/5`
      : `${baseClasses} border-muted hover:border-primary/50`;
  }

  
}
