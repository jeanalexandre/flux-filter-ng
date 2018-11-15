import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import {MaterialsModule} from "../materials.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
  ],
  declarations: [ApplicationComponent]
})
export class ApplicationModule { }
