import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-activity-admin',
  templateUrl: './activity-admin.component.html',
  styleUrls: ['./activity-admin.component.css']
})
export class ActivityAdminComponent {
  usersData: any;
  constructor(private apiService: AttendanceService) {
    apiService.getProfile().subscribe((data) => {
      this.usersData = data;
      console.log(this.usersData.data);
    });
  }
}
