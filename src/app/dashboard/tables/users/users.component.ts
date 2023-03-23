import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  usersData: any;
  constructor(private apiService: AttendanceService) {
    apiService.getProfile().subscribe((data) => {
      this.usersData = data;
      console.log(this.usersData.data);
    });
  }
}
