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
  gender: any;
  statusId: any;
  bankId: any;
  institutionId: any;
  departementId: any;
  employeeStatus: any;
  bank: any;
  institution: any;
  departement: any;
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
      this.attendance.getEmployeeStatus(),
      this.attendance.getBank(),
      this.attendance.getInstitutions(),
      this.attendance.getDepartements(),
      ).subscribe(([profileRes, statusRes, bankRes, institutionRes, departementRes,])=>{
        //PROFILE
        this.profile = profileRes;
        this.employeeStatus = statusRes;
        this.bank = bankRes;
        this.institution = institutionRes;
        this.departement = departementRes;
        let lenght = this.profile.data.length;
        let lengthStatus = this.employeeStatus.data.length;
        let lengthBank = this.bank.data.length;
        let lengthInstitution = this.institution.data.length;
        let lengthDepartement = this.departement.data.length;
        console.log(lengthDepartement);


        for (let i = 0; i < lenght; i++) {
          if (this.profile.data[i].nik == this.id) {
            this.profile = this.profile.data[i];
            this.statusId = this.profile.employeeStatusId;
            this.bankId = this.profile.bankId;
            this.institutionId = this.profile.institutionId;
            this.departementId = this.profile.departementId;
            if(this.profile.gender == 'P'){
              this.gender = 'Perempuan';

            }else if(this.profile.gender == 'L'){
              this.gender = 'Laki-laki';
            }
            break;
          }
        }
        //EMPLOYEE STATUS
        for(let i = 0; i < lengthStatus; i++){
          if(this.employeeStatus.data[i].id == this.statusId){
            this.employeeStatus = this.employeeStatus.data[i];
            console.log(this.employeeStatus);
          }else{
            console.log('status fail');
          }
        }
        //BANK
        for(let i = 0; i < lengthBank; i++){
          if(this.bank.data[i].id == this.bankId){
            this.bank = this.bank.data[i];
            console.log(this.bank.bankName);
            break;
          }else{
            console.log('bank fail');
          }
        }
        //INSTITUTIONS
        for(let i = 0; i < lengthInstitution; i++){
          if(this.institution.data[i].id == this.institutionId){
            this.institution = this.institution.data[i];
            console.log(this.institution);
            break;
          }else{
            console.log('inst fail');
          }
        }
        //DEPARTEMENTS
        for(let i = 0; i < lengthDepartement; i++){
          if(this.departement.data[i].id == this.departementId){
            this.departement = this.departement.data[i];
            console.log(this.departement);
            break;
          }else{
            console.log('dept fail');
          }
        }

      });
  }


}
