import { Component } from '@angular/core';
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { FoodPackageGridComponent } from '../../components/food-package-grid/food-package-grid.component';
import { StreetFoodContentComponent } from '../../components/street-food-content/street-food-content.component';

@Component({
  selector: 'app-foodstreet',
  imports: [HeroSectionComponent, FoodPackageGridComponent, StreetFoodContentComponent],
  templateUrl: './foodstreet.component.html',
  styleUrl: './foodstreet.component.css'
})
export class FoodstreetComponent {

}
