import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import{LoginRoutes} from './login.routing';
import { LoginComponent } from './login/login.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],providers: [],
  entryComponents: [],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
