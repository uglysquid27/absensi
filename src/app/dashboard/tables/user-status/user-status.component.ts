import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent {
  data: any;
  datapkl: any = [];
  dataintern: any = [];
  datamagang: any = [];
  dataProfile: any;
  active: any;
  constructor(private Employeservice: AttendanceService) {

    Employeservice.getEmployeeStatus().subscribe((loh) => {
      this.data = loh;
      // console.log(this.data.data[0]);
    });

    Employeservice.getProfile().subscribe((loh) => {
      this.dataProfile = loh;
      // console.log(this.dataProfile.data[0].nik);
      for(let i = 0; i < this.dataProfile.data.length; i++){
        if(this.dataProfile.data[i].employeeStatusId == 1){
          this.datapkl.push(this.dataProfile.data[i]);
        }else if(this.dataProfile.data[i].employeeStatusId == 2){
          this.dataintern.push(this.dataProfile.data[i]);
        }else if(this.dataProfile.data[i].employeeStatusId == 3){
          this.datamagang.push(this.dataProfile.data[i]);
        }
      };
    });
  }
  toggle(id: any) {
    this.active = 0;
    this.active = id;
     console.log(this.active);
     // HTMInputLElement
 }
}
