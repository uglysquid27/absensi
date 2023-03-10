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
  constructor(private attendance: AttendanceService, public router: Router) {}

  profile: any;
  profilePKL: any[] = [];
  profileMagang: any[] = [];
  profileInternship: any[] = [];

  ngOnInit() {
    this.getProfile();
    Aos.init({
      duration: 1200,
    });
  }

  getProfile() {
    this.attendance.getProfile().subscribe((result: any) => {
      this.profile = result.data;
      let length = this.profile.length;
      // console.log(length);

      for (let i = 0; i < length; i++) {
        // if(this.profile)

        if (this.profile[i].employeeStatusId == 1) {
          this.profilePKL.push(this.profile[i]);
        } else if (this.profile[i].employeeStatusId == 2) {
          this.profileInternship.push(this.profile[i]);
        } else if (this.profile[i].employeeStatusId == 3) {
          this.profileMagang.push(this.profile[i]);
        }
      }
      console.log(this.profilePKL[0].dateIn.getMonth());

      console.log(this.profileMagang);
    });
  }
}
