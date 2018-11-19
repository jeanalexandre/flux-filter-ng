import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {ApplicationComponent} from "./application/application.component";

const routes: Routes = [
  {path: '', component: ApplicationComponent},
  {path: 'application', component: ApplicationComponent},
  {path: '**', redirectTo: 'application', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
