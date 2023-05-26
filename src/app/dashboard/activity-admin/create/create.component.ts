import { DatePipe } from '@angular/common';
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
const datepipe: DatePipe = new DatePipe('en-US');

export enum attendance {
  Attended = '',
  'Off Day' = '',
  'Not Attended' = '',
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  attendanceEnum = Object.keys(attendance);
  attendances: any = attendance;
  form!: FormGroup;
  users: any;
  status: any;
  departments: any;
  institutions: any;
  banks: any;
  dayStatus: any;
  leave = false;
  submitted: Boolean = false;
  now = new Date();

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
      leave: [false],
      timeOut: ['17:00:00', Validators.required],
      description: [''],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.f['statusInput'].value != 'Attended') {
      this.f['leave'].setValue(false);
    }
    let body = {
      nik: this.f['nikInput'].value,
      dayStatus: this.f['statusInput'].value,
      date: new Date(),
      leave: this.f['leave'].value,
      timeIn: '08:00:00',
      timeOut: this.f['timeOut'].value,
      description: this.f['description'].value,
    };

    this.apiService.storeAttendance(body).subscribe(
      (data) => {
        console.log(data);
        this.alertServie.onCallAlert('Success Add Data', AlertType.Success);
        this.router.navigate(['/dashboard/activity']);
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
      console.log(this.filterFilledAttendance('10271'));
    });
  }
  filterFilledAttendance(nik: any) {
    return this.status.filter(
      (data: any) =>
        data.nik == nik &&
        this.convertDate(data.date) == this.convertDate(this.now)
    );
  }

  convertDate(date: any) {
    return datepipe.transform(date, 'dd-MMM-YYYY');
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
