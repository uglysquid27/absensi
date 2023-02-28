import { AttendanceService } from './../../service/attendance.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

  profile: any;
  service: any;
  property: any;

  constructor(private httpClient: HttpClient, private attendance: AttendanceService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.attendance.getProfile().subscribe((result:any)=>{
      this.profile=result;
      console.log(this.profile);
    })
  }

}
