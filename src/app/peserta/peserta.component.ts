import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Aos from 'aos';
import { AttendanceService } from '../service/attendance.service';

@Component({
  selector: 'app-peserta',
  templateUrl: './peserta.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./peserta.component.css'],
})
export class PesertaComponent {
  constructor(private attendance: AttendanceService, private router: Router) {
  }

  profile:any;

  ngOnInit() {
    this.getProfile();
    Aos.init({
      duration: 1200,
    });
  }


  getProfile(){
    this.attendance.getProfile().subscribe((result:any)=>{
      this.profile = result.data;
      Object.values(this.profile).forEach(data =>{
        var array = Object.keys(result.data).map(function(key){
          return result.data[key];

        });
        // console.log(array);

      })
    })
  }

}
