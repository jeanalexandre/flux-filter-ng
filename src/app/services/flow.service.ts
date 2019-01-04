import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {FlowResult} from "../models/flowResult.model";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Params} from "@angular/router";
import {environment} from "../../environments/environment";
import {Flow} from "../models/flow.model";

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  // ReactiveX object for datas
  flows: Observable<FlowResult>;
  private _flows: BehaviorSubject<FlowResult>;
  private dataStore: {
    flows: FlowResult;
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.dataStore = {flows: {}};
    this._flows = <BehaviorSubject<FlowResult>>new BehaviorSubject({});
    this.flows = this._flows.asObservable();
    this.loadAll();
  }

  // First load datas with 5 element per page
  loadAll() {
    const params: Params = {'limit': 5, 'page': 0};
    this.http.get(`${environment.apiBaseUrl}/flows`, {params}).subscribe((data: FlowResult) => {
      this.dataStore.flows = data;
      this._flows.next(Object.assign({}, this.dataStore).flows);
    }, error => this.toastr.error(error, 'Failed to load flows'));
  }

  // Refresh datas from back
  refreshFlows(params: Params) {
    this.http.get(`${environment.apiBaseUrl}/flows`, {params}).subscribe((data: FlowResult) => {
      this.dataStore.flows = data;
      this._flows.next(Object.assign({}, this.dataStore).flows);
    }, error => this.toastr.error(error, 'Failed to load flows'));
  }

  // Save new flow
  create(flow: Flow, paramsRefresh: {}) {
    this.http.post(`${environment.apiBaseUrl}/flows`, flow).subscribe(data => {
      this.toastr.success(`${flow.name} was created`, 'Success');
      this.refreshFlows(paramsRefresh);
    }, error => this.toastr.error(error, 'Failed to create the flux'));
  }

  // Delete the flow in param
  delete(flow: Flow, paramsRefresh: {}) {
    this.http.delete(`${environment.apiBaseUrl}/flows/${flow.id}`).subscribe(data => {
      this.toastr.success(`${flow.name} was deleted`, 'Success');
      this.refreshFlows(paramsRefresh);
    }, error => this.toastr.error(error, 'Failed to delete the flux'));
  }

  // Update the flow in param
  update(flow: Flow, paramsRefresh: {}) {
    this.http.put(`${environment.apiBaseUrl}/flows/${flow.id}`, flow).subscribe(data => {
      this.toastr.success(`${flow.name} was updated`, 'Success');
      this.refreshFlows(paramsRefresh);
    }, error => this.toastr.error(error, 'Failed to update the flux'));
  }
}
