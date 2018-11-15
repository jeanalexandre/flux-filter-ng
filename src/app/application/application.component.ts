import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../services/application.service";
import {Application} from "../models/application.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

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


  constructor(public applicationService: ApplicationService) { }

  ngOnInit() {
    this.applications = this.applicationService.getAllApplications();
  }

}
