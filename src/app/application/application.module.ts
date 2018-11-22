import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import {MaterialsModule} from "../materials.module";
import {AddApplicationDialogComponent} from "./add-application-dialog/add-application-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ApplicationComponent,
    AddApplicationDialogComponent,
  ]

})
export class ApplicationModule { }
