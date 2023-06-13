import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
})
export class ApprovalComponent {
  employees: any;
  constructor(private attendService: AttendanceService) {
    forkJoin([
      attendService.getProfile(),
      attendService.getTwoMonthAttendances(),
    ]).subscribe(([emps, attends]: any) => {
      this.employees = emps.data;
      console.log(emps.data);
      
      // this.attendances = attends;
      console.log();
    });
  }
}
