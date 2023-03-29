import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/service/alert/alert.model';
import { AlertService } from 'src/app/service/alert/alert.service';
import { AttendanceService } from 'src/app/service/attendance.service';

export enum attendance {
  'Attended' = 'work day',
  'Off Day' = 'holiday',
  'Not Attend' = 'off day',
  'Leaving' = 'leave day',
}
export enum gender {
  L = 'Laki - Laki',
  P = 'Perempuan',
}
export enum bloodType {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  genderEnum = Object.keys(gender);
  genders: any = gender;
  bloodEnum = Object.values(bloodType);
  attendanceEnum = Object.keys(attendance);
  attendances: any = attendance;
  form!: FormGroup;
  users: any;
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
      nikInput: ['', Validators.required],
      statusInput: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let body = {
      nik: this.f['nikInput'].value,
      dayStatus: this.f['statusInput'].value,
      date: new Date(),
      timeIn: '08:00:00',
      timeOut: '17:00:00',
    };

    this.apiService.storeAttendance(body).subscribe(
      (data) => {
        console.log(data);
        this.alertServie.onCallAlert('Success Add Data', AlertType.Success);
        this.router.navigate(['/dashboard/users']);
      },
      (err) => {
        this.alertServie.setAlert('Add Data Failed', AlertType.Error);
        console.log(err);
      }
    );
  }

  subscribeData() {
    forkJoin(
      this.apiService.getProfile(),
      this.apiService.getAttendance()
    ).subscribe(([employee, attendance]) => {
      this.users = employee.data;
      this.status = attendance.data;

      console.log(this.users);
    });
  }
  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
