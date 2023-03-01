import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from './../../service/attendance.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profile: any;
  statusId: any;
  employeeStatus: any;
  id = this.actRoute.snapshot.paramMap.get('id');

  constructor(private actRoute: ActivatedRoute, private attendance: AttendanceService) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  // getProfile() {
  //   this.attendance.getProfile().subscribe((result: any) => {
  //     this.profile = result.data;
  //     let lenght = this.profile.length;


    // })
  // }

  getProfileData(){
    forkJoin(
      this.attendance.getProfile(),
      this.attendance.getEmployeeStatus()
      ).subscribe(([profileRes, statusRes])=>{
        //profile
        this.profile = profileRes;
        this.employeeStatus = statusRes;
        console.log(this.employeeStatus);
        let lenght = this.profile.data.length;
        console.log(lenght);
        let lengthStatus = this.employeeStatus.data.length;
        console.log(lengthStatus);

        for (let i = 0; i < lenght; i++) {
          if (this.profile.data[i].nik == this.id) {
            this.profile = this.profile.data[i];
            // this.statusId = this.profile.data[i].employeestatusId;
            // console.log(this.profile);
            // break;
          }else{
            console.log('fail');

          }
          break;
        }

        console.log("test");



        for(let i = 0; i < lengthStatus; i++){
          if(this.employeeStatus.data[i].id = this.statusId){
            console.log("success");

          }else{
            console.log('fail');

          }
        }

      });
  }


}
