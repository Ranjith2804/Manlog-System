import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { ProcurementPageComponent } from './features/procurement/procurement-page/procurement-page.component';
import { SupplierPageComponent } from './features/supplier/supplier-page/supplier-page.component';
import { DcDashboardPageComponent } from './features/distribution/dc-dashboard-page/dc-dashboard-page.component';

// Concept: Routes array, redirectTo, pathMatch, wildcard (**)
export const routes: Routes = [
  { path: '',             redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',        component: LoginComponent },
  { path: 'home',         component: HomeComponent },
  { path: 'procurement',  component: ProcurementPageComponent },
  { path: 'supplier',     component: SupplierPageComponent },
  { path: 'distribution', component: DcDashboardPageComponent },
  { path: '**',           redirectTo: '/login' },
];
