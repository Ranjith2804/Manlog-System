// app.routes.ts  (root-level routing)
// ─────────────────────────────────────────────────────────────────────────────
// Wire the home feature under /features/home using lazy loading.
// Add your other feature routes (login, signup, admin, etc.) similarly.
// ─────────────────────────────────────────────────────────────────────────────

import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [

  // Landing / Home page
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

  // {
  //   path: 'signup',
  //   loadComponent: () =>
  //     import('./features/signup/signup.component').then(m => m.SignupComponent),
  // },

  {
    path: 'procurement',
    loadComponent: () =>
      import('./features/procurement/procurement-page/procurement-page.component')
        .then(m => m.ProcurementPageComponent),
    // canActivate: [authGuard]  ← add guards when ready
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

  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin-page/admin-page.component').then(m => m.AdminPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
