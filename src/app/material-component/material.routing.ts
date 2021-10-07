import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { ExpansionComponent } from './expansion/expansion.component';

export const MaterialRoutes: Routes = [
  {
    path: 'button',
    component: ButtonsComponent
  },
  {
    path: 'expansion',
    component: ExpansionComponent
  }
];
