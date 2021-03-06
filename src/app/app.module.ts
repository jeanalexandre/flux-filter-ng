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
import {CommonModule} from "@angular/common";
import {ToastrModule} from "ngx-toastr";
import {NgxGraphModule} from "@swimlane/ngx-graph";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {GraphComponent} from "./graph/graph.component";
import {BottomSheetComponent} from "./bottom-sheet/bottom-sheet.component";
import {FlowComponent} from "./flow/flow.component";
import {AddFlowDialogComponent} from "./flow/add-flow-dialog/add-flow-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    FlowComponent,
    NavigationComponent,
    AddApplicationDialogComponent,
    AddFlowDialogComponent,
    LoginComponent,
    RegisterComponent,
    GraphComponent,
    BottomSheetComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 3000,
    }),
    MaterialsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxGraphModule,
  ],
  exports: [
    MaterialsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  entryComponents: [
    AddApplicationDialogComponent,
    AddFlowDialogComponent,
    BottomSheetComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
