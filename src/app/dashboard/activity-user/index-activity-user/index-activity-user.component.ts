import { forkJoin } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance.service';
import { TokenStorageService } from './../../../service/auth/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { CKEditorComponent } from 'ckeditor4-angular';

@Component({
  selector: 'app-index-activity-user',
  templateUrl: './index-activity-user.component.html',
  styleUrls: ['./index-activity-user.component.css']
})
export class IndexActivityUserComponent implements OnInit {

  constructor(public session: TokenStorageService, public service: AttendanceService) { }

  // Status
  attended: any;
  notAttended: any;
  leaving: any;
  employeeStatus: any;

  // Form
  formAttendance!: FormGroup;
  dayStatus: String = '';
  dateNow: any;
  formActivity!: FormGroup;

  // ShowAttendance
  showAttendance: boolean = false;
  isAttended: any;
  showEditor: boolean = false;

  public config = {
    toolbar: [

      { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },

      '/',
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-'] },
      { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', , 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
    ]
  }
  editorData: any;

  // Activity
  activities: any;

  ngOnInit(): void {
    this.service.getAmountAttendance(this.session.getUser().nik).subscribe((res: any) => {
      this.attended = res.attended;
      this.notAttended = res.notAttended;
      this.leaving = res.leave;
    })

    forkJoin(([
      this.service.getAmountAttendance(this.session.getUser().nik),
      this.service.isAttended(this.session.getUser().nik),
      this.service.showActivity(this.session.getUser().nik)
    ])).subscribe(([
      amount,
      isAttended,
      activities
    ]) => {
      console.log(isAttended);
      this.isAttended = isAttended;
      this.activities = activities.activity;
      console.log(this.activities);

    })

    this.dateNow = moment().format('YYYY-MM-DD HH:mm:ss');



    this.formAttendance = new FormGroup({
      nik: new FormControl(this.session.getUser().nik),
      dayStatus: new FormControl(''),
      date: new FormControl(this.dateNow),
      timeIn: new FormControl('08:00:00'),
      timeOut: new FormControl('17:00:00'),
      description: new FormControl('')
    })

    this.formActivity = new FormGroup({
      nik: new FormControl(this.session.getUser().nik),
      activity: new FormControl('')
    })
  }


  onSelect(status: any) {
    this.dayStatus = status;
  }

  submit() {
    this.formAttendance.value.nik = Number(this.formAttendance.value.nik);
    if (this.formAttendance.value.dayStatus == 'Attended' || this.formAttendance.value.dayStatus == 'Off Day') {
      this.service.storeAttendance(this.formAttendance.value).subscribe((res: any) => {
        console.log(res);
        this.ngOnInit()
      })
    } else {
      if (this.formAttendance.value.description == '') {
        alert('Please fill the description');
        return;
      } else {
        this.service.storeAttendance(this.formAttendance.value).subscribe((res: any) => {
          console.log(res);
          this.ngOnInit();
        })
      }
    }
  }
  submitActivity() {
    this.formActivity.value.nik = Number(this.formActivity.value.nik);

    let data = this.formActivity.value.activity;
    let data2 = data.replace(/<ol/g, '<ol class="list-decimal"');
    let data3 = data2.replace(/<ul/g, '<ul class="list-disc"');
    this.formActivity.value.activity = data3;

    this.service.storeActivity(this.formActivity.value).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    })
  }

  deleteActivity(id: any) {
    this.service.deleteActivity(id).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    })
  }
}
