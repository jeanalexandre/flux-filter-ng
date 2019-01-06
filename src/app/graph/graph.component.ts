import {Component, OnInit} from '@angular/core';
import * as shape from 'd3-shape';
import {FlowService} from "../services/flow.service";
import {ApplicationService} from "../services/application.service";
import {Application} from "../models/application.model";
import {Flow} from "../models/flow.model";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  public flows: Flow[];
  public applications: Application[];
  public loading = true;
  public allNodesLoading = true;
  public graphLoading = true;
  public nodesWithLinks;
  public allNodes;
  public noDatas= false;
  public showFlowless = false;

  hierarchialGraph = {nodes: [], links: [], colorScheme: 'nightLights'};
  curve = shape.curveBundle.beta(1);


  constructor(public flowService: FlowService,
              public applicationService: ApplicationService,
  ) {
  }

  ngOnInit() {
    this.flowService.allFlows.subscribe(flows => {
      this.flows = flows;
      this.initgraph();
    });
    this.applicationService.allApplications.subscribe(applications => {
      this.applications = applications;
      this.initAllNodes();
    });
  }

  public changeVision(): void {
    if (!this.showFlowless) {
      this.hierarchialGraph.nodes = this.allNodes;
    } else {
      this.hierarchialGraph.nodes = this.nodesWithLinks;
    }
  }

  private initAllNodes(): void {
    this.allNodes = [];
    for (let app of this.applications) {
      this.allNodes.push({
        id: '' + app.id,
        label: app.name,
        position: app.description,
      });
    }
    this.allNodesLoading = false;
    this.checkLoading();
  }

  private initgraph(): void {
    if (this.flows && this.flows.length > 0) {
      this.nodesWithLinks = [];
      let links = [];

      for (let flow of this.flows) {
        links.push({
          source: '' + flow.sourceApp.id,
          target: '' + flow.targetApp.id,
          label: flow.name
        });
        this.saveOneOfNode(flow.sourceApp);
        this.saveOneOfNode(flow.targetApp);
      }
      this.hierarchialGraph.nodes = this.nodesWithLinks;
      this.hierarchialGraph.links = links;
      this.graphLoading = false;
      this.checkLoading();
    } else if (this.flows && this.flows.length === 0) {
      this.noDatas = true;
      this.graphLoading = false;
    }
  }

  private checkLoading(): void {
    if (!this.graphLoading && !this.allNodesLoading) {
      this.loading = false;
    }
  }

  private saveOneOfNode(application: Application) {
    if (!this.nodesWithLinks.find(app => app.id === '' + application.id)) {
      this.nodesWithLinks.push({
        id: '' + application.id,
        label: application.name,
        position: application.description,
      });
    }
  }
}
