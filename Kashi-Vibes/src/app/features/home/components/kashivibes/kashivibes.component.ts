import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-kashivibes',
  imports: [CommonModule],
  templateUrl: './kashivibes.component.html',
  styleUrl: './kashivibes.component.css'
})
export class KashivibesComponent {
  stats = [
    { value: "10K+", label: "Happy Travelers" },
    { value: "500+", label: "Tours Completed" },
    { value: "50+", label: "Destinations" },
  ];
}
