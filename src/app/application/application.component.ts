import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../services/application.service";
import {Application} from "../models/application.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSort, MatTableDataSource, Sort} from "@angular/material";

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
  public displayedColumns: string[] = ['name', 'team', 'feature'];
  public expandedElement: Application;
  public dataSources;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.applications = this.applicationService.getAllApplications();
    this.dataSources = new MatTableDataSource(this.applications);
    this.dataSources.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSources = this.applications.filter(application => {
        return application.name.toLowerCase().includes(filterValue.toLowerCase())
          || application.feature.toLowerCase().includes(filterValue.toLowerCase())
          || application.team.toLowerCase().includes(filterValue.toLowerCase())
      }
    )
  }

  sortData(sort: Sort) {
    const data = this.applications.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSources = data;
      return;
    }
  }

}
