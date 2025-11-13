import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
      <div class="text-4xl font-bold text-accent font-heading mb-2">
        {{ value }}
      </div>
      <div class="text-white/90 font-medium">
        {{ label }}
      </div>
    </div>
  `
})
export class StarCardComponent {
  @Input() value!: string;
  @Input() label!: string;
}