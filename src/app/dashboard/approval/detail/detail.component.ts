import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance.service';
import { DatePipe } from '@angular/common';
const datepipe: DatePipe = new DatePipe('en-US');

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  id = this.actRoute.snapshot.paramMap.get('id');

  // ------- Subscribe Variable
  recentAttend: any;
  recentAct: any;

  // ------- Modal Variable
  boolModal: Boolean = false;

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

  approvedModal() {
    this.boolModal = !this.boolModal;
  }

  approved(event: any) {
    // console.log(event.target.id);
    if (event.target.id == 'yesBtn') {
    } else {
      this.approvedModal();
    }
  }

  // filterAttend(nik: any) {
  //   return this.attendData.filter(
  //     (data: any) =>
  //       data.nik == nik &&
  //       this.convertDate(data.date) == this.convertDate(this.now)
  //   );
  // }

  filterActivity(id: any) {
    return this.recentAct.filter((data: any) => data.attendanceId == id);
  }

  // filterEnum(val: any) {
  //   return this.attendanceEnum.filter((data: any) => data == val);
  // }
  convertDate(date: any) {
    return datepipe.transform(date, 'dd-MMM-YYYY');
  }
}
