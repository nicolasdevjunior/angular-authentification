import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services/authentication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private msgHide: boolean = true;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private ngxLoader: NgxUiLoaderService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Email requis.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'pattern', message: 'Entrer un email valide.' },
      { type: 'validUsername', message: 'Email dejà pris.' }
    ],
    'password': [
      { type: 'required', message: 'Password requis.' },
      { type: 'minlength', message: 'Le mot de passe doit contenir au moins 3 caractères.' },
      { type: 'maxlength', message: 'Le mot de passe doit contenir au maximum 155 caractères.' },
      { type: 'pattern', message: 'Your password must contain only numbers and letters.' },
    ],
  };

  ngOnInit() {
    this.ngxLoader.start();
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 100);
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(155),
        Validators.minLength(3),
        Validators.required
      ])),
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.msgHide = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe((data) => {
          // console.log("token",data);
          if (data.access_token != null) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.error = data;
          }
        },
          error => {
            this.error = error;
          });
    }

  }


  clickOnAlert() {
    this.msgHide = false;
  }

}
