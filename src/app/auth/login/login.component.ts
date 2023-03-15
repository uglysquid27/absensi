import {
  Component,
  ViewContainerRef,
  // ComponentFactoryResolver,
  // ComponentRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularNotificationService } from 'angular-notification-alert';
import { AlertType } from 'src/app/service/alert/alert.model';
import { AlertService } from 'src/app/service/alert/alert.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { TokenStorageService } from 'src/app/service/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notif: AngularNotificationService // private componentFactoryResolver: ComponentFactoryResolver, // private componentRef: ComponentRef<any>
  ) {}
  form!: FormGroup;
  // form: any = {
  //   email: null,
  //   password: null,
  // };
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    // const { email, password } = this.f;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.f['email'].value, this.f['password'].value)
      .subscribe(
        (data) => {
          // console.log(data.access_token);

          this.tokenStorage.saveToken(data.access_token);
          this.tokenStorage.saveUser(data.user);
          // console.log(data);

          // this.isLoginFailed = false;
          // this.isLoggedIn = true;
          // this.roles = this.tokenStorage.getUser().roles;
          this.alertService.onCallAlert('Login Success', AlertType.Success);
          this.reloadPage();
        },
        (err) => {
          if (err.statusText == 'Unauthorized') {
            this.alertService.onCallAlert(
              'Invalid Email or Password',
              AlertType.Error
            );
          } else {
            this.alertService.onCallAlert('Login Failed', AlertType.Error);
          }

          // console.log(err.statusText);

          // this.errorMessage = err.error.message;
          // this.isLoginFailed = true;
          this.submitted = false;
          this.form.setValue({ email: '', password: '' });
        }
      );
  }

  reloadPage(): void {
    this.router.navigate(['/']);
    // window.location.reload();
  }
}
