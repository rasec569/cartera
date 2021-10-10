import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AutenticacionGuard } from "./guards/autenticacion.guard";

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      { path:'**',
        redirectTo:'/login',
        pathMatch:'full'
      }
    ]
  },





];
