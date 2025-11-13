import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../main-layout/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../main-layout/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  
}
