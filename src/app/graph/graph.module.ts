import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgxGraphModule} from "@swimlane/ngx-graph";

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    NgxGraphModule,
  ],
  declarations: [GraphComponent]
})
export class GraphModule { }
