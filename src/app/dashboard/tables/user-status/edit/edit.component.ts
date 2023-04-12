import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/service/alert/alert.model';
import { AlertService } from 'src/app/service/alert/alert.service';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  id = this.activeRoute.snapshot.paramMap.get('id');
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
    this.form = this.formBuilder.group({
      statusInput: ['', Validators.required],
      salaryInput: ['', Validators.required],
      bonusInput: ['', Validators.required],
    });
    this.subscribeData();
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let body = {
      employeeStatus: this.f['statusInput'].value,
      salary: this.f['salaryInput'].value,
      bonus: this.f['bonusInput'].value,
    };

    // console.log(body);

    this.apiService.updateEmployeeStatus(this.id, body).subscribe(
      (data) => {
        console.log(data);
        this.alertServie.onCallAlert('Success Edited', AlertType.Success)
        this.router.navigate(['/dashboard/user-status']);
      },
      (err) => {
        this.alertServie.setAlert('Edited Failed', AlertType.Error)
        console.log(err);

      }
    );
  }

  subscribeData() {
    forkJoin(
      this.apiService.getEmployeeStatusbyId(this.id),
      this.apiService.getEmployeeStatus()
    ).subscribe(([employee, status]) => {
      this.user = employee;
      this.status = status;

      this.f['statusInput'].setValue(this.user.employeeStatus);
      this.f['salaryInput'].setValue(this.user.salary);
      this.f['bonusInput'].setValue(this.user.bonus);
      console.log(this.user.status);
    });
  }
}
