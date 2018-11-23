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
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    NavigationComponent,
    AddApplicationDialogComponent,
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
  providers: [],
  entryComponents: [
    AddApplicationDialogComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
