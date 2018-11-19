import { Injectable } from '@angular/core';
import {Application} from "../models/application.model";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private applications: Application[] = [];

  constructor() {
    this.applications.push(
      new Application(
        'Application 1',
        ['HTML5', 'JAVA', 'JAVASCRIPT'],
        'Team 1',
        'Initialisation projet',
        ));
    this.applications.push(
      new Application(
        'Application 2',
        ['HTML5', 'TYPESCRIPT', 'PYTHON'],
        'Team 2',
        'Ajout de fonctionalités',
        ));
    this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
        ));
    this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));this.applications.push(
      new Application(
        'Application 3',
        ['HTML5', 'JAVASCRIPT', 'RUBY'],
        'Team 1',
        'Configuration',
      ));
  }

  getAllApplications() {
    return this.applications;
  }
}
