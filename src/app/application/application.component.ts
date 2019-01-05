import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../services/application.service";
import {Application} from "../models/application.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatBottomSheet, MatDialog, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {AddApplicationDialogComponent} from "./add-application-dialog/add-application-dialog.component";
import {AppResult} from "../models/appResult.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BottomSheetComponent} from "../bottom-sheet/bottom-sheet.component";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ApplicationComponent implements OnInit {

  public filterForm: FormGroup;
  public golbalFilterForm: FormGroup;

  public applications: AppResult;
  public displayedColumns: string[] = ['name', 'team', 'description'];
  public expandedElement: Application;
  public dataSources;
  public loading = true;
  public advancedFilter = false;

  @ViewChild(MatSort) sort: MatSort;

  // MatPaginator Inputs
  public pageSizeOptions: number[] = [5, 10, 25];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(public applicationService: ApplicationService,
              public dialog: MatDialog,
              private bottomSheet: MatBottomSheet,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.applicationService.applications.subscribe(applications => {
      this.applications = applications;
      this.dataSources = new MatTableDataSource(this.applications.results);
      this.dataSources.sort = this.sort;
      this.loading = false;
    });
    this.filterForm = this.formBuilder.group({
      nameFilter: ['', []],
      teamFilter: ['', []],
      descriptionFilter: ['', []],
      technologieFilter: ['', []],
    });
    this.golbalFilterForm = this.formBuilder.group({
      valueFilter: ['', []],
      nameCheck: [true, []],
      teamCheck: [true, []],
      descriptionCheck: [true, []],
      technologieCheck: [true, []],
    });
  }

  get nameFilter() {
    return this.filterForm.get('nameFilter');
  }

  get teamFilter() {
    return this.filterForm.get('teamFilter');
  }

  get descriptionFilter() {
    return this.filterForm.get('descriptionFilter');
  }

  get technologieFilter() {
    return this.filterForm.get('technologieFilter');
  }

  get valueFilter() {
    return this.golbalFilterForm.get('valueFilter');
  }

  get nameCheck() {
    return this.golbalFilterForm.get('nameCheck');
  }

  get teamCheck() {
    return this.golbalFilterForm.get('teamCheck');
  }

  get descriptionCheck() {
    return this.golbalFilterForm.get('descriptionCheck');
  }

  get technologieCheck() {
    return this.golbalFilterForm.get('technologieCheck');
  }

  // Open Dialog for add new App
  add(): void {
    const dialogRef = this.dialog.open(AddApplicationDialogComponent, {
      width: '80vw',
      height: '70vh',
      data: {application: new Application(), editing: false, technos: []}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applicationService.create(result, this.makeParams());
      }
    });
  }

  // Open dialog for update app in param
  update(application: Application): void {
    const technos = application.technologies.split(',');
    const dialogRef = this.dialog.open(AddApplicationDialogComponent, {
      width: '80vw',
      height: '70vh',
      data: {application: application, editing: true, technos: technos}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applicationService.update(result, this.makeParams());
      }
    });
  }

  // Delete app
  public delete(application: Application) {
    let sheetRef = this.bottomSheet.open(BottomSheetComponent, {
      data: application
    });
    sheetRef.afterDismissed().subscribe(data => {
      if (data && data.message == 'delete') {
        this.applicationService.delete(application, this.makeParams());
      }
    });
  }

  // Save params and refresh
  public paginatorEvent(event) {
    this.pageEvent = event;
    this.refreshApp();
  }

  // Refresh datas
  public refreshApp() {
    this.applicationService.refreshApps(this.makeParams());
  }

  // Make params object for refresh
  private makeParams() {
    let limit;
    let page;
    if (this.pageEvent) {
      limit = this.pageEvent.pageSize;
      page = this.pageEvent.pageIndex * this.pageEvent.pageSize;
    } else {
      limit = 5;
      page = 0;
    }
    if (this.advancedFilter) {
      return {
        'strict': true,
        'limit': limit,
        'page': page,
        'technologies': this.technologieFilter.value,
        'team': this.teamFilter.value,
        'description': this.descriptionFilter.value,
        'name': this.nameFilter.value
      }
    } else {
      const value = this.valueFilter.value;
      const name = this.nameCheck.value ? value : '';
      const team = this.teamCheck.value ? value : '';
      const techno = this.technologieCheck.value ? value : '';
      const description = this.descriptionCheck.value ? value : '';

      return {
        'strict': false,
        'limit': limit,
        'page': page,
        'technologies': techno,
        'team': team,
        'description': description,
        'name': name
      }
    }
  }
}
