import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent {
  data: any;
  employees: any;
  attendances: any;
  constructor(private attendService: AttendanceService) {
    forkJoin([
      attendService.getProfile(),
      attendService.getAttendance(),
    ]).subscribe(([emps, attends]) => {
      this.employees = emps;
      this.attendances = attends;
      console.log(this.attendances.data);
      console.log(this.countAttendances('10282'));
    });

    // attendService.getProfile().subscribe((loh) => {
    //   this.data = loh;
    //   console.log(this.data.data[0]);
    // });
  }
  countAttendances(nik: any) {
    let attend = this.filterAttendances(nik).filter(
      (data: any) => data.dayStatus == 'Attended'
    ).length;

    let notAttend = this.filterAttendances(nik).filter(
      (data: any) => data.dayStatus == 'Not Attended'
    ).length;
    let dayOff = this.filterAttendances(nik).filter(
      (data: any) => data.dayStatus == 'Off Day'
    ).length;
    return { attend, notAttend, dayOff };
  }
  filterAttendances(nik: any) {
    return this.attendances.data.filter((data: any) => data.nik == nik);
  }
}
