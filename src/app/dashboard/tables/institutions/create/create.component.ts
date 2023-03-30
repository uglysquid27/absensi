import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/service/alert/alert.model';
import { AlertService } from 'src/app/service/alert/alert.service';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  form!: FormGroup;
  user: any;
  status: any;
  departments: any;
  institutions: any;
  banks: any;
  submitted: Boolean = false;

  get f() {
    return this.form.controls;
  }

  constructor(
    private router: Router,
    private alertServie: AlertService,
    private activeRoute: ActivatedRoute,
    private apiService: AttendanceService,
    private formBuilder: FormBuilder
  ) {
    this.subscribeData();
    this.form = this.formBuilder.group({
      instInput: ['', Validators.required],
      cityInput: ['', Validators.required],
    });

  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let body = {
      institution: this.f['instInput'].value,
      city: this.f['cityInput'].value,
    };

    this.apiService.storeInstitutionsStatus(body).subscribe(
      (data) => {
        console.log(data);
        this.alertServie.onCallAlert('Success Add Data', AlertType.Success)
        this.router.navigate(['/dashboard/institutions']);
      },
      (err) => {
        this.alertServie.setAlert('Add Data Failed', AlertType.Error)
        console.log(err);

      }
    );

  }

  subscribeData() {
    forkJoin(
      this.apiService.getInstitutionsbyId(this.id),
      this.apiService.getInstitutions()
    ).subscribe(([employee, status]) => {
      this.user = employee;
      this.status = status;

      this.f['cityInput'].setValue(this.user.city);
      this.f['instInput'].setValue(this.user.institution);
      console.log(this.user.status);
    });
  }
  id(id: any): import("rxjs").ObservableInput<Object> {
    throw new Error('Method not implemented.');
  }
}




