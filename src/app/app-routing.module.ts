import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {ApplicationComponent} from "./application/application.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./_guards/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {GraphComponent} from "./graph/graph.component";

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'application',
    component: ApplicationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'graph',
    component: GraphComponent,
  },
  {
    path: '**',
    redirectTo: 'application',
    pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
