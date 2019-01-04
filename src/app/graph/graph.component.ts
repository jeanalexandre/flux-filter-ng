import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {FlowService} from "../services/flow.service";
import {FlowResult} from "../models/flowResult.model";
import {AppResult} from "../models/appResult.model";
import {ApplicationService} from "../services/application.service";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  public flows: FlowResult;
  public applications: AppResult;
  public loading = true;

  hierarchialGraph = {nodes: [], links: [], colorScheme: 'nightLights'};
  curve = shape.curveBundle.beta(1);

  // curve = shape.curveLinear;

  constructor(public flowService: FlowService,
              public applicationService: ApplicationService,
  ) {
  }

  ngOnInit() {
    this.flowService.flows.subscribe(flows => {
      this.flows = flows;
      this.initgraph();
    });
    this.applicationService.applications.subscribe(applications => {
      this.applications = applications;
      this.initgraph();
    });
  }

  private initgraph(): void {
    if (this.flows && this.flows.results && this.applications && this.applications.results) {
      let nodes = [];
      let links = [];
      for (let app of this.applications.results) {
        nodes.push({
          id: '' + app.id,
          label: app.name,
          position: app.description,
        });
      }
      for (let flow of this.flows.results) {
        links.push({
          source: '' + flow.sourceApp.id,
          target: '' + flow.targetApp.id,
          label: flow.name
        });
      }
      this.hierarchialGraph.nodes = nodes;
      this.hierarchialGraph.links = links;
      this.loading = false;
    }
  }
}
