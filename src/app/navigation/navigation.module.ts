import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import {MaterialsModule} from "../materials.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
  ],
  declarations: [NavigationComponent]
})
export class NavigationModule { }
