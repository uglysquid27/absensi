import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.css']
})
export class InstitutionsComponent {
  usersData: any;
  constructor(private apiService: AttendanceService) {
    apiService.getInstitutions().subscribe((data) => {
      this.usersData = data;
      console.log(this.usersData.data);
    });
  }
}
