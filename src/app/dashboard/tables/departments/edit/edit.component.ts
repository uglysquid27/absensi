import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/service/alert/alert.model';
import { AlertService } from 'src/app/service/alert/alert.service';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  id = this.activeRoute.snapshot.paramMap.get('id');
  form!: FormGroup;
  user: any;
  status: any;
  departments: any;
  institutions: any;
  banks: any;
  submitted: Boolean = false;

  get f() {
    return this.form.controls;
  }

  constructor(
    private router: Router,
    private alertServie: AlertService,
    private activeRoute: ActivatedRoute,
    private apiService: AttendanceService,
    private formBuilder: FormBuilder
  ) {
    this.subscribeData();
    this.form = this.formBuilder.group({
      depInput: ['', Validators.required],
      descInput: ['', Validators.required],
    });

  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let body = {
      departementName: this.f['depInput'].value,
      description: this.f['descInput'].value,
    };

    this.apiService.UpdateDepartementsStatus(this.id, body).subscribe(
      (data) => {
        console.log(data);
        this.alertServie.onCallAlert('Success Add Data', AlertType.Success)
        this.router.navigate(['/dashboard/departments']);
      },
      (err) => {
        this.alertServie.setAlert('Add Data Failed', AlertType.Error)
        console.log(err);

      }
    );

  }

  subscribeData() {
    forkJoin(
      this.apiService.getDepartementsbyId(this.id),
      this.apiService.getDepartements()
    ).subscribe(([employee, status]) => {
      this.user = employee;
      this.status = status;

      this.f['depInput'].setValue(this.user.departementName);
      this.f['descInput'].setValue(this.user.description);
      console.log(this.id);

      console.log(this.user);
    });
  }
}





