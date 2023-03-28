import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/service/alert/alert.model';
import { AlertService } from 'src/app/service/alert/alert.service';
import { AttendanceService } from 'src/app/service/attendance.service';

export enum isActive {
  Inactive = 'InActive',
  Active = 'Active',
}
export enum gender {
  L = 'Laki - Laki',
  P = 'Perempuan',
}
export enum bloodType {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  genderEnum = Object.keys(gender);
  genders: any = gender;
  bloodEnum = Object.values(bloodType);
  isActiveEnum = Object.keys(isActive);
  isActives: any = isActive;
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
      nikInput: ['', Validators.required],
      statusInput: ['', Validators.required],
      nameInput: ['', Validators.required],
      emailInput: ['', Validators.required],
      passwordInput: ['', Validators.required],
      placeBirthInput: ['', Validators.required],
      dateBirthInput: ['', Validators.required],
      genderInput: ['', Validators.required],
      bloodInput: ['', Validators.required],
      institutionInput: ['', Validators.required],
      departmentInput: ['', Validators.required],
      bankInput: ['', Validators.required],
      majorInput: ['', Validators.required],
      studyInput: ['', Validators.required],
      dateInInput: ['', Validators.required],
      longAppInput: ['', Validators.required],
      isActiveInput: ['', Validators.required],
    });

  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let body = {
      nik: this.f['nikInput'].value,
      institutionId: this.f['institutionInput'].value,
      departementId: this.f['departmentInput'].value,
      bankId: this.f['bankInput'].value,
      employeeStatusId: this.f['statusInput'].value,
      name: this.f['nameInput'].value,
      isActive: this.f['isActiveInput'].value,
      email: this.f['emailInput'].value,
      password: this.f['passwordInput'].value,
      placeOfBirth: this.f['placeBirthInput'].value,
      dateOfBirth: this.f['dateBirthInput'].value,
      gender: this.f['genderInput'].value,
      dateIn: this.f['dateInInput'].value,
      longApprentice: this.f['longAppInput'].value,
      existingEdu: this.f['studyInput'].value,
      major: this.f['majorInput'].value,
      blood: this.f['bloodInput'].value,
    };

    this.apiService.storeEmployee(body).subscribe(
      (data) => {
        console.log(data);
        this.alertServie.onCallAlert('Success Add Data', AlertType.Success)
        this.router.navigate(['/dashboard/users']);
      },
      (err) => {
        this.alertServie.setAlert('Add Data Failed', AlertType.Error)
        console.log(err);

      }
    );

  }

  subscribeData() {
    forkJoin(

      this.apiService.getEmployeeStatus(),
      this.apiService.getDepartements(),
      this.apiService.getInstitutions(),
      this.apiService.getBank()
    ).subscribe(([status, dep, inst, bank]) => {
      this.status = status;
      this.departments = dep;
      this.institutions = inst;
      this.banks = bank;

      console.log(this.status.data);

    });
  }
  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}

