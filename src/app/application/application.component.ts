import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../services/application.service";
import {Application} from "../models/application.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog, MatSort, MatTableDataSource, Sort} from "@angular/material";
import {AddApplicationDialogComponent} from "./add-application-dialog/add-application-dialog.component";
import {SelectionModel} from "@angular/cdk/collections";

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

  public applications: Application[];
  public displayedColumns: string[] = ['name', 'team', 'description'];
  public expandedElement: Application;
  public dataSources;
  selection = new SelectionModel<Application>(true, []);

  @ViewChild(MatSort) sort: MatSort;

  constructor(public applicationService: ApplicationService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.applicationService.applications.subscribe(applications => {
      this.applications = applications;
      this.dataSources = new MatTableDataSource(this.applications);
      this.dataSources.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSources = this.applications.filter(application => {
        return application.name.toLowerCase().includes(filterValue.toLowerCase())
          || application.description.toLowerCase().includes(filterValue.toLowerCase())
          || application.team.toLowerCase().includes(filterValue.toLowerCase())
      }
    )
  }

  add(): void {
    const dialogRef = this.dialog.open(AddApplicationDialogComponent, {
      width: '80vw',
      height: '70vh',
      data: {application: new Application()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.applicationService.create(result);
      }
    });
  }
}
