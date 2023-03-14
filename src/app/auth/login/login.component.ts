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
  // form!: FormGroup;
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngOnInit() {
    this.alertService.setAlert('haloo', AlertType.Warning);
    console.log(this.alertService.getAlert().mess);
    console.log(this.alertService.getAlert().typ);
    this.alertService.clearAlert();
    console.log(this.alertService.getAlert().mess);
    console.log(this.alertService.getAlert().typ);

    // this.form = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],
    // });
  }

  get f() {
    return this.form.controls;
  }
  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      (data) => {
        console.log(data.access_token);

        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    // this.alertService.onCallAlert();
  }

  reloadPage(): void {
    this.router.navigate(['/']);
    // window.location.reload();
  }
}
