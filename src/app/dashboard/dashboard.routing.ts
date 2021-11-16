import { Routes } from '@angular/router';
import { AutenticacionGuard } from '../guards/autenticacion.guard';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AutenticacionGuard]
}];
