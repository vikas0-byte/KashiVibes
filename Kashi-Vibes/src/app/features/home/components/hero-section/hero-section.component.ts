import { Component } from '@angular/core';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { StarCardComponent } from '../../../../shared/components/star-card/star-card.component';


@Component({
  selector: 'app-hero-section',
  imports: [LucideAngularModule, SearchBarComponent, StarCardComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {

  heroBg = 'assets/Hero/hero-bg.jpg';
  omSymbol = 'assets/Hero/om-symbol.png'

  handleSearch(query: string) {
    console.log('Search query:', query);
    // Handle the search logic here
  }
}
