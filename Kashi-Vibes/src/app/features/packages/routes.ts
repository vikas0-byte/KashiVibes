import { Routes } from "@angular/router";
import { PackagesPageComponent } from "./pages/packages-page/packages-page.component";
import { FoodstreetComponent } from "./pages/FoodPackage/pages/foodstreet/foodstreet.component";

export const PACKAGE_ROUTES: Routes = [
    {
        path: '',
        component: PackagesPageComponent
    },

    {
        path: 'street-food-hidden-gems',
        component: FoodstreetComponent
    },
];