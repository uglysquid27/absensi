import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent {
  usersData: any;
  constructor(private apiService: AttendanceService) {
    apiService.getBank().subscribe((data) => {
      this.usersData = data;
      console.log(this.usersData.data);
    });
  }
}
