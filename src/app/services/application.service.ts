import {Injectable} from '@angular/core';
import {Application} from "../models/application.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {ToastrService} from "ngx-toastr";
import {AppResult} from "../models/appResult.model";
import {Params} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  // ReactiveX object for datas
  applications: Observable<AppResult>;
  allApplications: Observable<Application[]>;
  private _applications: BehaviorSubject<AppResult>;
  private _allApplications: BehaviorSubject<Application[]>;
  private dataStore: {
    applications: AppResult;
  };
  private allAppStore: {
    allApplications: Application[];
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.dataStore = {applications: {}};
    this.allAppStore = {allApplications: []};
    this._applications = <BehaviorSubject<AppResult>>new BehaviorSubject({});
    this.applications = this._applications.asObservable();
    this._allApplications = <BehaviorSubject<Application[]>>new BehaviorSubject({});
    this.allApplications = this._allApplications.asObservable();
    this.initApp();
    this.loadAll();
  }

  // First load datas with 5 element per page
  initApp() {
    const params: Params = {'limit': 5, 'page': 0};
    this.http.get(`${environment.apiBaseUrl}/apps`, {params}).subscribe((data: AppResult) => {
      this.dataStore.applications = data;
      this._applications.next(Object.assign({}, this.dataStore).applications);
    }, error => this.toastr.error(error, 'Failed to load apps'));
  }

  // Get all apps
  loadAll() {
    const params: Params = {'limit': 0, 'page': 0};
    this.http.get(`${environment.apiBaseUrl}/apps`, {params}).subscribe((data: AppResult) => {
      this.allAppStore.allApplications = data.results;
      this._allApplications.next(Object.assign({}, this.allAppStore).allApplications);
    }, error => this.toastr.error(error, 'Failed to load apps'));
  }

  // Refresh datas from back
  refreshApps(params: Params) {
    this.http.get(`${environment.apiBaseUrl}/apps`, {params}).subscribe((data: AppResult) => {
      this.dataStore.applications = data;
      this._applications.next(Object.assign({}, this.dataStore).applications);
    }, error => this.toastr.error(error, 'Failed to load apps'));
  }

  // Save new app
  create(application: Application, paramsRefresh: {}) {
    this.http.post(`${environment.apiBaseUrl}/apps`, application).subscribe(data => {
      this.toastr.success(`${application.name} was created`, 'Success');
      this.refreshApps(paramsRefresh);
    }, error => this.toastr.error(error, 'Failed to create the application'));
  }

  // Delete the app in param
  delete(application: Application, paramsRefresh: {}) {
    this.http.delete(`${environment.apiBaseUrl}/apps/${application.id}`).subscribe(data => {
      this.toastr.success(`${application.name} was deleted`, 'Success');
      this.refreshApps(paramsRefresh);
    }, error => this.toastr.error(error, 'Failed to delete the application'));
  }

  // Update the app in param
  update(application: Application, paramsRefresh: {}) {
    this.http.put(`${environment.apiBaseUrl}/apps/${application.id}`, application).subscribe(data => {
      this.toastr.success(`${application.name} was updated`, 'Success');
      this.refreshApps(paramsRefresh);
    }, error => this.toastr.error(error, 'Failed to update the application'));
  }
}
