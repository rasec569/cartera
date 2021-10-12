import { Routes } from '@angular/router';
import { FormUserComponent } from './panel/panel-components/form-user/form-user.component';
import { PanelComponent } from './panel/panel.component';
import { UsersComponent } from './panel/panel-components/users/users.component';

export const PagesRoutes: Routes = [
  {  path: 'panel', component:PanelComponent },
  { path:'newuser', component:FormUserComponent},
  { path:'newuser/:id', component:FormUserComponent},
  { path:'users', component:UsersComponent}

];
