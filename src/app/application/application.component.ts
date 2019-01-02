import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../services/application.service";
import {Application} from "../models/application.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog, MatSort, MatTableDataSource, PageEvent} from "@angular/material";
import {AddApplicationDialogComponent} from "./add-application-dialog/add-application-dialog.component";
import {AppResult} from "../models/appResult.model";

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

  public applications: AppResult;
  public displayedColumns: string[] = ['name', 'team', 'description'];
  public expandedElement: Application;
  public dataSources;
  public loading = true;

  @ViewChild(MatSort) sort: MatSort;

  // MatPaginator Inputs
  public pageSizeOptions: number[] = [5, 10, 25];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(public applicationService: ApplicationService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.applicationService.applications.subscribe(applications => {
      this.applications = applications;
      this.dataSources = new MatTableDataSource(this.applications.results);
      this.dataSources.sort = this.sort;
      this.loading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSources = this.applications.results.filter(application => {
        return application.name.toLowerCase().includes(filterValue.toLowerCase())
          || application.description.toLowerCase().includes(filterValue.toLowerCase())
          || application.team.toLowerCase().includes(filterValue.toLowerCase())
      }
    )
  }

  // Open Dialog for add new App
  add(): void {
    const dialogRef = this.dialog.open(AddApplicationDialogComponent, {
      width: '80vw',
      height: '70vh',
      data: {application: new Application()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applicationService.create(result, this.makeParams());
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
    return {
      'limit': this.pageEvent.pageSize,
      'page': (this.pageEvent.pageIndex * this.pageEvent.pageSize),
      'technologies': '',
      'team': '',
      'description': '',
      'name': ''}
  }
}
