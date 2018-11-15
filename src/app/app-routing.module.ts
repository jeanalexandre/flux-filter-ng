import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: '', component: AppComponent },
  // {
  //   path: 'admin',
  //   canActivate: [AuthGuardService],
  //   loadChildren: '../admin/admin.module#AdminModule'
  // },
  // {
  //   path: 'form',
  //   loadChildren: '../form/form.module#FormModule'
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: '**',
  //   component: NotFoundComponent
  // }
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
