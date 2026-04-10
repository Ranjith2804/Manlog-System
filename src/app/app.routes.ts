import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-page/admin-page.component').then(m => m.AdminPageComponent),
  },

  {
    path: 'procurement',
    loadComponent: () =>
      import('./features/procurement/procurement-page/procurement-page.component')
        .then(m => m.ProcurementPageComponent),
  },

  {
    path: 'supplier',
    loadComponent: () =>
      import('./features/supplier/supplier-page/supplier-page.component')
        .then(m => m.SupplierPageComponent),
  },

  {
    path: 'distribution',
    loadComponent: () =>
      import('./features/distribution/dc-dashboard-page/dc-dashboard-page.component')
        .then(m => m.DcDashboardPageComponent),
  },

  { path: '**', redirectTo: '' },
];
