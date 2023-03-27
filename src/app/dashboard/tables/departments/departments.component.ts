import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent {
  usersData: any;
  constructor(private apiService: AttendanceService) {
    apiService.getDepartements().subscribe((data) => {
      this.usersData = data;
      console.log(this.usersData.data);
    });
  }
}
