import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public submited = false;
  public passVisible = false;

  @ViewChild('passwordElement') passwordElement: ElementRef;

  constructor(private formBuild: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuild.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  passIsVisible(): void {
    if(this.passVisible) {
      this.passwordElement.nativeElement.type = 'password'
    } else {
      this.passwordElement.nativeElement.type = 'text'
    }
    this.passVisible = !this.passVisible;
  }

  onSubmit(): void {
    this.submited = true;
    this.userService.register({
      'email': this.email.value,
      'password': this.password.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value
    });

    this.router.navigate(['/login']);

  }

}
