import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import * as Aos from 'aos';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance.service';


@Component({
  selector: 'app-peserta',
  templateUrl: './peserta.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./peserta.component.css'],
})
export class PesertaComponent {
  constructor(private attendance: AttendanceService, public router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: AttendanceService,) {}

  profile: any;
  profilePKL: any[] = [];
  profileMagang: any[] = [];
  profileInternship: any[] = [];
  profilePhoto: any[] = [];
  id = this.activeRoute.snapshot.paramMap.get('id');
  user: any;
  status: any;
  cardPhotoSrc: any;
  link='http://localhost:3000/';

  ngOnInit() {
    this.getProfile();
    this.subscribeData();
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
      // console.log(this.profilePKL[0].dateIn.getMonth());

      // console.log(this.profileInternship);
    });
  }
  subscribeData() {
    forkJoin(
      this.apiService.getProfile(),
      this.apiService.getDocument(),
    ).subscribe(([employee, status]) => {
      this.user = employee.data;
      this.status = status.data;
      let length = this.user.length;
      console.log(length);
      console.log(this.filterDoc('10282'));


      // console.log(this.status.data[1].idCardPhoto);

      for (let i = 0; i < length; i++) {
        if (this.filterDoc(this.user[i].nik)) {
          this.cardPhotoSrc = `http://localhost:3000/${this.filterDoc(this.user[i].nik)[0].officialPhoto}`;
          this.profilePhoto.push(this.cardPhotoSrc);
          console.log(this.profilePhoto);
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
