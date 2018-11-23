import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentification.service";
import {User} from "../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  currentUser: User;

  constructor(public router: Router, private authenticationService: AuthenticationService,) {
    this.authenticationService.currentUser.subscribe(x => x ? this.currentUser = x : null);
  }

  ngOnInit() {
  }

  logout() {
    this.currentUser = null;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
