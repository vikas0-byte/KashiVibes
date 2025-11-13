import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Redirect root to home
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // Home route
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/routes').then((m) => m.HOME_ROUTES),
      },

      // Package route
      {
        path: 'package',
        loadChildren: () =>
          import('./features/packages/routes').then((m) => m.PACKAGE_ROUTES),
      }
    ],
  },
];
