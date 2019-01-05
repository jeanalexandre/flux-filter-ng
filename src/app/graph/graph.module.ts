import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphComponent} from './graph.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgxGraphModule} from "@swimlane/ngx-graph";
import {MaterialsModule} from "../materials.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule,
    NgxChartsModule,
    NgxGraphModule,
  ],
  declarations: [
    GraphComponent,
  ]
})
export class GraphModule {
}
