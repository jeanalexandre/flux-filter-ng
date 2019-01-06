import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {FlowResult} from "../models/flowResult.model";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Params} from "@angular/router";
import {environment} from "../../environments/environment";
import {Flow} from "../models/flow.model";
import {newFlow} from "../models/newFlow.model";

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  // ReactiveX object for datas
  flows: Observable<FlowResult>;
  allFlows: Observable<Flow[]>;
  private _flows: BehaviorSubject<FlowResult>;
  private _allFlows: BehaviorSubject<Flow[]>;
  private dataStore: {
    flows: FlowResult;
  };
  private allFlowsStore: {
    allFlows: Flow[];
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.dataStore = {flows: {}};
    this.allFlowsStore = {allFlows: []};
    this._flows = <BehaviorSubject<FlowResult>>new BehaviorSubject({});
    this._allFlows = <BehaviorSubject<Flow[]>>new BehaviorSubject({});
    this.flows = this._flows.asObservable();
    this.allFlows = this._allFlows.asObservable();
    this.initFlow();
    this.loadAll();
  }

  // First load datas with 5 element per page
  initFlow() {
    const params: Params = {'limit': 5, 'page': 0, 'strict': 1};
    this.http.get(`${environment.apiBaseUrl}/flows`, {params}).subscribe((data: FlowResult) => {
      this.dataStore.flows = data;
      this._flows.next(Object.assign({}, this.dataStore).flows);
    }, error => this.toastr.error(error, 'Failed to load flows'));
  }

  // load all flows
  loadAll() {
    const params: Params = {'limit': 0, 'page': 0, 'strict': 1};
    this.http.get(`${environment.apiBaseUrl}/flows`, {params}).subscribe((data: FlowResult) => {
      this.allFlowsStore.allFlows = data.results;
      this._allFlows.next(Object.assign({}, this.allFlowsStore).allFlows);
    }, error => this.toastr.error(error, 'Failed to load flows'));
  }

  // Refresh datas from back
  refreshFlows(params: Params) {
    this.http.get(`${environment.apiBaseUrl}/flows`, {params}).subscribe((data: FlowResult) => {
      this.dataStore.flows = data;
      this._flows.next(Object.assign({}, this.dataStore).flows);
    }, error => this.toastr.error(error, 'Failed to load flows'));
    this.loadAll();
  }

  // Save new flow
  create(flow: newFlow, paramsRefresh: {}) {
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
  update(flow: newFlow, paramsRefresh: {}) {
    this.http.put(`${environment.apiBaseUrl}/flows/${flow.id}`, flow).subscribe(data => {
      this.toastr.success(`${flow.name} was updated`, 'Success');
      this.refreshFlows(paramsRefresh);
    }, error => this.toastr.error(error, 'Failed to update the flux'));
  }
}
