import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialsModule} from "./materials.module";
import {AppRoutingModule} from "./app-routing.module";
import {ApplicationComponent} from "./application/application.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {AddApplicationDialogComponent} from "./application/add-application-dialog/add-application-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    NavigationComponent,
    AddApplicationDialogComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    //Décommenter pour activer le fakeBackend de l'authentification
    // fakeBackendProvider,
  ],
  entryComponents: [
    AddApplicationDialogComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
