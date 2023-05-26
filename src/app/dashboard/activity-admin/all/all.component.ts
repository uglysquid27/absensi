import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from './../../../service/attendance.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
const datepipe: DatePipe = new DatePipe('en-US');

export enum att {
  Attended,
  'Off Day',
  'Not Attended',
  Leaving,
}

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
  profile: any;
  profileAll: any;
  gender: any;
  statusId: any;
  bankId: any;
  activity: any;
  recentAct: any[] = [];
  recentAttend: any[] = [];
  attend: any;
  institutionId: any;
  departementId: any;
  employeeStatus: any;
  bank: any;
  institution: any;
  departement: any;
  id = this.actRoute.snapshot.paramMap.get('id');
  attendanceEnum = Object.keys(att);
  attendances: any = att;
  usersData: any;
  attendData: any;
  activityData: any;
  activData: any;
  result: any;
  now = new Date();

  constructor(
    private actRoute: ActivatedRoute,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    // this.getProfileData();
    this.subscibe();
  }
  subscibe() {
    forkJoin(
      this.attendanceService.getAttendanceByNik(this.id),
      this.attendanceService.getActivity()
    ).subscribe(([attendNik, activity]) => {
      this.recentAttend = attendNik;
      this.recentAct = activity.data;
      console.log(attendNik);
      console.log(this.recentAct);
      console.log(this.filterActivity(1));
    });
  }

  // getProfile() {
  //   this.attendance.getProfile().subscribe((result: any) => {
  //     this.profile = result.data;
  //     let lenght = this.profile.length;

  // })
  // }

  // getProfileData() {
  //   forkJoin(
  //     this.attendance.getProfile(),
  //     this.attendance.getEmployeeStatus(),
  //     this.attendance.getBank(),
  //     this.attendance.getInstitutions(),
  //     this.attendance.getDepartements(),
  //     this.attendance.getActivity(),
  //     this.attendance.getAttendance()
  //   ).subscribe(
  //     ([profileRes, statusRes, bankRes, institutionRes, departementRes, actRes, attRes]) => {
  //       //PROFILE
  //       this.profile = profileRes;
  //       this.profileAll = profileRes;
  //       this.employeeStatus = statusRes;
  //       this.bank = bankRes;
  //       this.institution = institutionRes;
  //       this.departement = departementRes;
  //       this.activity = actRes;
  //       this.attend = attRes;
  //       let lenght = this.profile.data.length;
  //       let lengthStatus = this.employeeStatus.data.length;
  //       let lengthBank = this.bank.data.length;
  //       let lengthInstitution = this.institution.data.length;
  //       let lengthDepartement = this.departement.data.length;
  //       let lengthAct = this.activity.data.length;
  //       let lengthAtt = this.attend.data.length;

  //       //GET PROFILE ALL
  //       for (let i = 0; i < lenght; i++) {
  //         this.profileAll = this.profileAll.data[i];
  //         // console.log(this.profileAll);
  //         break;
  //       }
  //       //GET PROFILE
  //       for (let i = 0; i < lenght; i++) {
  //         if (this.profile.data[i].nik == this.id) {
  //           // console.log(this.profile);

  //           this.profile = this.profile.data[i];
  //           this.statusId = this.profile.employeeStatusId;
  //           this.bankId = this.profile.bankId;
  //           this.institutionId = this.profile.institutionId;
  //           this.departementId = this.profile.departementId;
  //           if (this.profile.gender == 'P') {
  //             this.gender = 'Perempuan';
  //           } else if (this.profile.gender == 'L') {
  //             this.gender = 'Laki-laki';
  //           }
  //           break;
  //         }
  //       }
  //       //GET ATTENDANCES THEN ACTIVITY
  //       for(let i = 0; i < lengthAtt; i++){
  //         if (this.attend.data[i].nik == this.id && this.activity.data[i] != null) {
  //           console.log('etst');

  //           for(let j = 0; j < lengthAct; j++){
  //             if(this.activity.data[i].attendanceId == this.attend.data[i].id){
  //               this.recentAct.push(this.activity.data[i]);
  //               this.recentDate.push(this.attend.data[i].dayStatus);
  //             }
  //           }
  //         } else {
  //           console.log('et');
  //           this.recentDate.push(this.attend.data[i].dayStatus);
  //         }
  //       }
  //       // console.log(this.recentAct);
  //       console.log(this.recentDate);

  //       //EMPLOYEE STATUS
  //       for (let i = 0; i < lengthStatus; i++) {
  //         if (this.employeeStatus.data[i].id == this.statusId) {
  //           this.employeeStatus = this.employeeStatus.data[i];
  //           // console.log(this.employeeStatus);
  //         } else {
  //           // console.log('status fail');
  //         }
  //       }
  //       //BANK
  //       for (let i = 0; i < lengthBank; i++) {
  //         if (this.bank.data[i].id == this.bankId) {
  //           this.bank = this.bank.data[i];
  //           // console.log(this.bank.bankName);
  //           break;
  //         } else {
  //           // console.log('bank fail');
  //         }
  //       }
  //       //INSTITUTIONS
  //       for (let i = 0; i < lengthInstitution; i++) {
  //         if (this.institution.data[i].id == this.institutionId) {
  //           this.institution = this.institution.data[i];
  //           // console.log(this.institution);
  //           break;
  //         } else {
  //           // console.log('inst fail');
  //         }
  //       }
  //       //DEPARTEMENTS
  //       for (let i = 0; i < lengthDepartement; i++) {
  //         if (this.departement.data[i].id == this.departementId) {
  //           this.departement = this.departement.data[i];
  //           // console.log(this.departement);
  //           break;
  //         } else {
  //           // console.log('dept fail');
  //         }
  //       }
  //     }
  //   );
  // }
  filterAttend(nik: any) {
    return this.attendData.filter(
      (data: any) =>
        data.nik == nik &&
        this.convertDate(data.date) == this.convertDate(this.now)
    );
  }

  filterActivity(id: any) {
    return this.recentAct.filter((data: any) => data.attendanceId == id);
  }
  filterEnum(val: any) {
    return this.attendanceEnum.filter((data: any) => data == val);
  }
  convertDate(date: any) {
    return datepipe.transform(date, 'dd-MMM-YYYY');
  }
}
