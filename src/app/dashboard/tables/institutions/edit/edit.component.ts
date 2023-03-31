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
      this.form = this.formBuilder.group({
        cityInput: ['', Validators.required],
        instInput: ['', Validators.required],
      });
      this.subscribeData();
    }
    onSubmit() {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      let body = {
        city: this.f['cityInput'].value,
        institution: this.f['instInput'].value,
      };

      // console.log(body);

      this.apiService.updateInstitutionsStatus(this.id, body).subscribe(
        (data) => {
          console.log(data);
          this.alertServie.onCallAlert('Success Edited', AlertType.Success)
          this.router.navigate(['/dashboard/institutions']);
        },
        (err) => {
          this.alertServie.setAlert('Edited Failed', AlertType.Error)
          console.log(err);

        }
      );
    }

    subscribeData() {
      forkJoin(
        this.apiService.getInstitutionsbyId(this.id),
        this.apiService.getInstitutions()
      ).subscribe(([employee, status]) => {
        this.user = employee;
        this.status = status;

        this.f['cityInput'].setValue(this.user.city);
        this.f['instInput'].setValue(this.user.institution);
        console.log(this.id);

        console.log(this.user);
      });
    }
  }

