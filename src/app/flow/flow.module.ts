import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowComponent } from './flow.component';
import {MaterialsModule} from "../materials.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddFlowDialogComponent } from './add-flow-dialog/add-flow-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FlowComponent,
    AddFlowDialogComponent,
  ]
})
export class FlowModule { }
