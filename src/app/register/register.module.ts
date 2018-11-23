import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import {MaterialsModule} from "../materials.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
