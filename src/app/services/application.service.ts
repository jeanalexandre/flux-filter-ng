import {Injectable} from '@angular/core';
import {Application} from "../models/application.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  applications: Observable<Application[]>;
  private _applications: BehaviorSubject<Application[]>;
  private dataStore: {
    applications: Application[];
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.dataStore = { applications: [] };
    this._applications = <BehaviorSubject<Application[]>>new BehaviorSubject([]);
    this.applications = this._applications.asObservable();
    this.loadAll();
  }

  loadAll() {
    this.http.get(`${environment.apiBaseUrl}/apps`).subscribe((data: Application[]) => {
      this.dataStore.applications = data;
      this._applications.next(Object.assign({}, this.dataStore).applications);
    }, error => this.toastr.error(error, 'Failed to load apps'));
  }

  create(application: Application) {
    this.http.post(`${environment.apiBaseUrl}/apps`, application).subscribe(data => {
      this.dataStore.applications.push(data);
      this._applications.next(Object.assign({}, this.dataStore).applications);
      this.toastr.success(`${application.name} was created`, 'Success');
    }, error => this.toastr.error(error, 'Failed to create the application'));
  }
}
