import { Component, NgZone } from '@angular/core';
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
  dateNow = new Date();
  constructor(
    private attendService: AttendanceService,
    private ngZone: NgZone
  ) {
    this.ngZone.run(() => {
      forkJoin([
        attendService.getProfile(),
        attendService.getTwoMonthAttendances(),
      ]).subscribe(([emps, attends]: any) => {
        this.employees = emps;
        this.attendances = attends;
        console.log();
        console.log(this.attendances);

        console.log(this.countAttendances('10282'));
      });
    });

    console.log(this.dateNow.getDate());

    // attendService.getProfile().subscribe((loh) => {
    //   this.data = loh;
    //   console.log(this.data.data[0]);
    // });
  }
  countAttendances(nik: any) {
    let date = new Date();
    let attend;
    let notAttend;
    let dayOff;
    let start: string | number;
    let end: string | number;
    // console.log(new Date(new Date().setDate(14)).toISOString());

    if (date.getDate() >= 15) {
      // console.log('after');
      start = new Date(new Date().setDate(14)).toISOString();
      end = new Date(
        new Date().setMonth(new Date().getMonth() + 1, 14)
      ).toISOString();
      attend = this.filterAttendances(nik).filter(
        (data: any) =>
          data.dayStatus == 'Attended' && data.date > start && data.date <= end
      ).length;
      notAttend = this.filterAttendances(nik).filter(
        (data: any) =>
          data.dayStatus == 'Not Attended' &&
          data.date > start &&
          data.date <= end
      ).length;
      dayOff = this.filterAttendances(nik).filter(
        (data: any) =>
          data.dayStatus == 'Off Day' && data.date > start && data.date <= end
      ).length;
      // console.log(attend + ' ' + notAttend);
    } else {
      // console.log('before');
      start = new Date(
        new Date().setMonth(new Date().getMonth() - 1, 14)
      ).toISOString();
      end = new Date(new Date().setDate(14)).toISOString();
      attend = this.filterAttendances(nik).filter(
        (data: any) =>
          data.dayStatus == 'Attended' && data.date < end && data.date >= start
      ).length;

      notAttend = this.filterAttendances(nik).filter(
        (data: any) =>
          data.dayStatus == 'Not Attended' &&
          data.date > end &&
          data.date <= start
      ).length;
      dayOff = this.filterAttendances(nik).filter(
        (data: any) =>
          data.dayStatus == 'Off Day' && data.date > end && data.date <= start
      ).length;
    }

    return { attend, notAttend, dayOff, start, end };
  }
  filterAttendances(nik: any) {
    return this.attendances.filter((data: any) => data.nik == nik);
  }
}
