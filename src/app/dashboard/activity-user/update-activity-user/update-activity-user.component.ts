import { TokenStorageService } from './../../../service/auth/token-storage.service';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/service/attendance.service';
import { Component, OnInit } from '@angular/core';
import { CKEditorComponent } from 'ckeditor4-angular';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-update-activity-user',
  templateUrl: './update-activity-user.component.html',
  styleUrls: ['./update-activity-user.component.css']
})
export class UpdateActivityUserComponent implements OnInit {
  public config = {
    toolbar: [
      { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
      '/',
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-'] },
      { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', , 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
    ]
  }
  editorData: any;
  constructor(private service: AttendanceService, private Router: Router, private session: TokenStorageService) { }

  formActivity!: FormGroup;
  activity: any;

  params = this.Router.url.split('/')[4];
  ngOnInit(): void {
    this.service.getActivitybyId(this.params).subscribe((res: any) => {
      this.activity = res;
      this.editorData = this.activity.activity;
      this.formActivity = new FormGroup({
        activity: new FormControl(this.activity.activity),
        nik: new FormControl(this.session.getUser().nik)
      })
    })
  }
  submitActivity() {
    this.formActivity.value.nik = Number(this.formActivity.value.nik);

    let data = this.formActivity.value.activity;
    let data2 = data.replace(/<ol/g, '<ol class="list-decimal"');
    let data3 = data2.replace(/<ul/g, '<ul class="list-disc"');
    this.formActivity.value.activity = data3;
    console.log(this.formActivity.value);
    
    this.service.updateActivity(this.params, this.formActivity.value).subscribe((res: any) => {
      this.Router.navigate(['/dashboard/myActivity'])
    })
  }
}
