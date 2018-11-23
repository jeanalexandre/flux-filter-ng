import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient,
              private toastr: ToastrService,
  ) {
  }

  getAll() {
    this.http.get<User[]>(`${environment.apiBaseUrl}/users`).subscribe((data: User[]) => {
      return data;
    }, error => this.toastr.error(error, 'Failed to load users'));
  }

  register(user) {
    this.http.post<User>(`${environment.apiBaseUrl}/users/register`, user).subscribe(user => {
      this.toastr.success(`${user.firstName} was created`, 'Success');
      return user;
    }, error => this.toastr.error(error, 'Failure to register\n'));
  }
}
