import {Injectable} from '@angular/core';
import {Application} from "../models/application.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  applications: Observable<Application[]>;
  private _applications: BehaviorSubject<Application[]>;
  private dataStore: {
    applications: Application[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { applications: [] };
    this._applications = <BehaviorSubject<Application[]>>new BehaviorSubject([]);
    this.applications = this._applications.asObservable();
    this.loadAll();
  }

  loadAll() {
    this.http.get(`${environment.apiBaseUrl}/apps`).subscribe((data: Application[]) => {
      console.log(data);
      this.dataStore.applications = data;
      this._applications.next(Object.assign({}, this.dataStore).applications);
    }, error => console.log('Could not load applications.' ));
  }

  create(application: Application) {
    this.http.post(`${environment.apiBaseUrl}/apps`, application).subscribe(data => {
      this.dataStore.applications.push(data);
      this._applications.next(Object.assign({}, this.dataStore).applications);
    }, error => console.log('Could not create application.'));
  }
}
