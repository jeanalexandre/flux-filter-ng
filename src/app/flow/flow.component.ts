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
  public globalFilterForm: FormGroup;

  public flows: FlowResult;
  public applications: Application[];
  public displayedColumns: string[] = ['name', 'description'];
  public expandedElement: Flow;
  public dataSources;
  public loading = true;
  public advancedFilter = false;

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
    this.globalFilterForm = this.formBuilder.group({
      valueFilter: ['', []],
      nameCheck: [true, []],
      descriptionCheck: [true, []],
      technologieCheck: [true, []],
      sourceAppCheck: [true, []],
      targetAppCheck: [true, []],
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

  get valueFilter() {
    return this.globalFilterForm.get('valueFilter');
  }

  get nameCheck() {
    return this.globalFilterForm.get('nameCheck');
  }

  get descriptionCheck() {
    return this.globalFilterForm.get('descriptionCheck');
  }

  get technologieCheck() {
    return this.globalFilterForm.get('technologieCheck');
  }

  get sourceAppCheck() {
    return this.globalFilterForm.get('sourceAppCheck');
  }

  get targetAppCheck() {
    return this.globalFilterForm.get('targetAppCheck');
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

    let limit;
    let page;
    interface Params {
      name?: string,
      description?: string,
      technologies?: string
      sourceAppName?: string
      targetAppName?: string
    }

    if (this.pageEvent) {
      limit = this.pageEvent.pageSize;
      page = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    } else {
      limit = 5;
      page = 0;
    }

    if (this.advancedFilter) {
      const sourceName = this.sourceApp.value ? this.sourceApp.value : '';
      const targetName = this.targetApp.value ? this.targetApp.value : '';
      return {
        'strict': 1,
        'limit': 5,
        'page': 0,
        'technologies': this.technologieFilter.value,
        'description': this.descriptionFilter.value,
        'name': this.nameFilter.value,
        'targetAppName': targetName,
        'sourceAppName': sourceName,
      }
    } else {
      const value = this.valueFilter.value;
      let params = new class implements Params {
        strict?: number;
        limit?: number;
        page?: number;
        description?: string;
        name?: string;
        technologies?: string;
        targetAppName?: string;
        sourceAppName?: string;
      };
      params.strict = 0;
      params.limit = limit;
      params.page = page;
      this.nameCheck.value ? params.name = value : '';
      this.technologieCheck.value ? params.technologies = value : '';
      this.descriptionCheck.value ? params.description = value : '';
      this.sourceAppCheck.value ? params.sourceAppName = value : '';
      this.targetAppCheck.value ? params.targetAppName = value : '';
      return params;
    }
  }
}
