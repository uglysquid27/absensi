import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from './../../service/attendance.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  profile: any;
  profileAll: any;
  gender: any;
  statusId: any;
  bankId: any;
  activity: any;
  recentAct: any[] = [];
  recentDate: any[] = [];
  attend: any;
  institutionId: any;
  departementId: any;
  employeeStatus: any;
  bank: any;
  institution: any;
  departement: any;
  id = this.actRoute.snapshot.paramMap.get('id');
  profilePKL: any[] = [];
  profileMagang: any[] = [];
  profileInternship: any[] = [];
  profilePhoto: any[] = [];
  user: any;
  status: any;
  cardPhotoSrc: any;
  link='http://localhost:3000/';

  constructor(
    private actRoute: ActivatedRoute,
    private attendance: AttendanceService
  ) {}

  ngOnInit(): void {
    this.getProfileData();
    this.subscribeData();
  }

  // getProfile() {
  //   this.attendance.getProfile().subscribe((result: any) => {
  //     this.profile = result.data;
  //     let lenght = this.profile.length;

  // })
  // }

  getProfileData() {
    forkJoin(
      this.attendance.getProfile(),
      this.attendance.getEmployeeStatus(),
      this.attendance.getBank(),
      this.attendance.getInstitutions(),
      this.attendance.getDepartements(),
      this.attendance.getActivity(),
      this.attendance.getAttendance()
    ).subscribe(
      ([profileRes, statusRes, bankRes, institutionRes, departementRes, actRes, attRes]) => {
        //PROFILE
        this.profile = profileRes;
        this.profileAll = profileRes;
        this.employeeStatus = statusRes;
        this.bank = bankRes;
        this.institution = institutionRes;
        this.departement = departementRes;
        this.activity = actRes;
        this.attend = attRes;
        let lenght = this.profile.data.length;
        let lengthStatus = this.employeeStatus.data.length;
        let lengthBank = this.bank.data.length;
        let lengthInstitution = this.institution.data.length;
        let lengthDepartement = this.departement.data.length;
        let lengthAct = this.activity.data.length;
        let lengthAtt = this.attend.data.length;

        //GET PROFILE ALL
        for (let i = 0; i < lenght; i++) {
          this.profileAll = this.profileAll.data[i];
          // console.log(this.profileAll);
          break;
        }
        //GET PROFILE
        for (let i = 0; i < lenght; i++) {
          if (this.profile.data[i].nik == this.id) {
            // console.log(this.profile);

            this.profile = this.profile.data[i];
            this.statusId = this.profile.employeeStatusId;
            this.bankId = this.profile.bankId;
            this.institutionId = this.profile.institutionId;
            this.departementId = this.profile.departementId;
            if (this.profile.gender == 'P') {
              this.gender = 'Perempuan';
            } else if (this.profile.gender == 'L') {
              this.gender = 'Laki-laki';
            }
            break;
          }
        }
        //GET ATTENDANCES THEN ACTIVITY
        for(let i = 0; i < lengthAtt; i++){
          if(this.attend.data[i].nik == this.id){
            for(let j = 0; j < lengthAct; j++){
              if(this.activity.data[i].attendanceId == this.attend.data[i].id){
                this.recentAct.push(this.activity.data[i]);
              }
            }
          }
        }
        console.log(this.recentAct);

        //EMPLOYEE STATUS
        for (let i = 0; i < lengthStatus; i++) {
          if (this.employeeStatus.data[i].id == this.statusId) {
            this.employeeStatus = this.employeeStatus.data[i];
            // console.log(this.employeeStatus);
          } else {
            // console.log('status fail');
          }
        }
        //BANK
        for (let i = 0; i < lengthBank; i++) {
          if (this.bank.data[i].id == this.bankId) {
            this.bank = this.bank.data[i];
            // console.log(this.bank.bankName);
            break;
          } else {
            // console.log('bank fail');
          }
        }
        //INSTITUTIONS
        for (let i = 0; i < lengthInstitution; i++) {
          if (this.institution.data[i].id == this.institutionId) {
            this.institution = this.institution.data[i];
            // console.log(this.institution);
            break;
          } else {
            // console.log('inst fail');
          }
        }
        //DEPARTEMENTS
        for (let i = 0; i < lengthDepartement; i++) {
          if (this.departement.data[i].id == this.departementId) {
            this.departement = this.departement.data[i];
            // console.log(this.departement);
            break;
          } else {
            // console.log('dept fail');
          }
        }
      }
    );
  }
        //GET PHOTO
        subscribeData() {
          forkJoin(
            this.attendance.getProfile(),
            this.attendance.getDocument(),
          ).subscribe(([employee, status]) => {
            this.user = employee.data;
            this.status = status.data;
            let length = this.user.length;
            // console.log(length);
            // console.log(this.filterDoc('10282'));


            // console.log(this.status.data[1].idCardPhoto);

            for (let i = 0; i < length; i++) {
              if (this.user[i].nik == this.id) {
                this.cardPhotoSrc = `http://localhost:3000/${this.filterDoc(this.user[i].nik)[0].officialPhoto}`;
                this.profilePhoto.push(this.cardPhotoSrc);
                // console.log(this.profilePhoto);
              }
            }
          });
        }

  filterDoc(nik:any){
    return this.status.filter(
      (data: any) => data.nik == nik
    );
  }
}
