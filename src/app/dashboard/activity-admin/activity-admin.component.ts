import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance.service';
const datepipe: DatePipe = new DatePipe('en-US');

export enum attendance {
  Attended,
  'Off Day' ,
  'Not Attended',
  Leaving
}
@Component({
  selector: 'app-activity-admin',
  templateUrl: './activity-admin.component.html',
  styleUrls: ['./activity-admin.component.css'],
})
export class ActivityAdminComponent {
  attendanceEnum = Object.keys(attendance);
  attendances: any = attendance;
  usersData: any;
  attendData: any;
  activityData: any;
  activData: any;
  result: any;
  now = new Date();
  constructor(private apiService: AttendanceService) {
    forkJoin(
      this.apiService.getProfile(),
      this.apiService.getAttendance(),
      this.apiService.getActivity()
    ).subscribe(([users, attend, activ]) => {
      this.usersData = users.data;
      this.attendData = attend.data;
      this.activityData = activ.data;
      console.log(activ.data);

      console.log(this.filterEnum(this.filterAttend('10282')[0].dayStatus));
      
      console.log(this.attendData);
      
      console.log(this.filterAttend('10282')[0].dayStatus);

      // console.log(this.convertDate(this.now));
      // console.log(this.convertDate(this.attendData[1].date));

      // console.log(this.activityData.filter((data: any) => (data.attendanceId = 1)));

      // console.log(this.filterActivity(this.filterAttend('10278')[0]));
    });
  }
  filterAttend(nik: any) {
    return this.attendData.filter(
      (data: any) =>
        data.nik == nik &&
        this.convertDate(data.date) == this.convertDate(this.now)
    );
  }
  filterActivity(id: any) {
    return this.activityData.filter((data: any) => data.attendanceId == id);
  }
  filterEnum(val: any) {
    return this.attendanceEnum.filter(
      (data: any) => data == val
    );
  }
  convertDate(date: any) {
    return datepipe.transform(date, 'dd-MMM-YYYY');
  }
}
