import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatBottomSheet, MatDialog, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {FlowResult} from "../models/flowResult.model";
import {Flow} from "../models/flow.model";
import {FlowService} from "../services/flow.service";
import {BottomSheetComponent} from "../bottom-sheet/bottom-sheet.component";
import {AddFlowDialogComponent} from "./add-flow-dialog/add-flow-dialog.component";
import {ApplicationService} from "../services/application.service";
import {Application} from "../models/application.model";

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FlowComponent implements OnInit {

  public filterForm: FormGroup;

  public flows: FlowResult;
  public applications: Application[];
  public displayedColumns: string[] = ['name', 'description'];
  public expandedElement: Flow;
  public dataSources;
  public loading = true;

  @ViewChild(MatSort) sort: MatSort;

  // MatPaginator Inputs
  public pageSizeOptions: number[] = [5, 10, 25];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(public flowService: FlowService,
              public applicationService: ApplicationService,
              public dialog: MatDialog,
              private bottomSheet: MatBottomSheet,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.flowService.flows.subscribe(flows => {
      this.flows = flows;
      this.dataSources = new MatTableDataSource(this.flows.results);
      this.dataSources.sort = this.sort;
      if (this.flows && this.flows.results && this.applications) {
        this.loading = false;
      }
    });
    this.applicationService.allApplications.subscribe(applications => {
      this.applications = applications;
      if (this.flows && this.flows.results && this.applications) {
        this.loading = false;
      }
    });
    this.filterForm = this.formBuilder.group({
      nameFilter: ['', []],
      descriptionFilter: ['', []],
      technologieFilter: ['', []],
      sourceApp: ['', []],
      targetApp: ['', []],
    });
  }

  get nameFilter() {
    return this.filterForm.get('nameFilter');
  }

  get descriptionFilter() {
    return this.filterForm.get('descriptionFilter');
  }

  get technologieFilter() {
    return this.filterForm.get('technologieFilter');
  }

  get targetApp() {
    return this.filterForm.get('targetApp');
  }

  get sourceApp() {
    return this.filterForm.get('sourceApp');
  }

  // Open Dialog for add new Flow
  add(): void {
    const dialogRef = this.dialog.open(AddFlowDialogComponent, {
      width: '80vw',
      height: '70vh',
      data: {flow: new Flow(), editing: false, technos: [], applications: this.applications}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flowService.create(result, this.makeParams());
      }
    });
  }

  // Open dialog for update flow in param
  update(flow: Flow): void {
    const technos = flow.technologies.split(',');
    const dialogRef = this.dialog.open(AddFlowDialogComponent, {
      width: '80vw',
      height: '70vh',
      data: {flow: flow, editing: true, technos: technos, applications: this.applications}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flowService.update(result, this.makeParams());
      }
    });
  }

  // Delete flow
  public delete(flow: Flow) {
    let sheetRef = this.bottomSheet.open(BottomSheetComponent, {
      data: flow
    });
    sheetRef.afterDismissed().subscribe(data => {
      if (data && data.message == 'delete') {
        this.flowService.delete(flow, this.makeParams());
      }
    });
  }

  // Save params and refresh
  public paginatorEvent(event) {
    this.pageEvent = event;
    this.refreshFlow();
  }

  // Refresh datas
  public refreshFlow() {
    this.flowService.refreshFlows(this.makeParams());
  }

  // Make params object for refresh
  private makeParams() {
    if (this.pageEvent) {
      return {
        'limit': this.pageEvent.pageSize,
        'page': (this.pageEvent.pageIndex * this.pageEvent.pageSize),
        'technologies': this.technologieFilter.value,
        'description': this.descriptionFilter.value,
        'name': this.nameFilter.value
      }
    } else {
      return {
        'limit': 5,
        'page': 0,
        'technologies': this.technologieFilter.value,
        'description': this.descriptionFilter.value,
        'name': this.nameFilter.value,
        'targetAppName': this.targetApp.value,
        'sourceAppName': this.sourceApp.value,
      };
    }

  }
}
