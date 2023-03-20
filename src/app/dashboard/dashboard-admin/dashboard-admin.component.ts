import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent {
  data: any;
  constructor(private Employeservice: AttendanceService) {
    Employeservice.getProfile().subscribe((loh) => {
      this.data = loh;
      console.log(this.data.data[0]);
    });
  }
}
