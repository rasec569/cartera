import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
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
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      { path:'**',
        redirectTo:'/login',
        pathMatch:'full'
      }
    ]
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }




];
