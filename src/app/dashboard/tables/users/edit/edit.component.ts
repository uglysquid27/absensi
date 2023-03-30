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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  id = this.activeRoute.snapshot.paramMap.get('id');
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
  cardPhotoSrc: any;
  cardPhotoFile!: File;
  ofPhotoSrc: any;
  ofPhotoFile!: File;
  bankPhotoSrc: any;
  bankPhotoFile!: File;

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
      nikInput: ['', Validators.required],
      statusInput: ['', Validators.required],
      nameInput: ['', Validators.required],
      emailInput: ['', Validators.required],
      placeBirthInput: ['', Validators.required],
      dateBirthInput: ['', Validators.required],
      genderInput: ['', Validators.required],
      bloodInput: ['', Validators.required],
      institutionInput: ['', Validators.required],
      departmentInput: ['', Validators.required],
      bankInput: ['', Validators.required],
      majorInput: ['', Validators.required],
      studyInput: ['', Validators.required],
      longAppInput: ['', Validators.required],
      isActiveInput: ['', Validators.required],
      cardPhotoInput: ['', Validators.required],
      ofPhotoInput: ['', Validators.required],
      bankPhotoInput: ['', Validators.required],
    });
    this.subscribeData();
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
      placeOfBirth: this.f['placeBirthInput'].value,
      dateOfBirth: this.f['dateBirthInput'].value,
      gender: this.f['genderInput'].value,
      longApprentice: this.f['longAppInput'].value,
      existingEdu: this.f['studyInput'].value,
      major: this.f['majorInput'].value,
      blood: this.f['bloodInput'].value,
    };

    // console.log(body);

    this.apiService.updateEmployee(this.id, body).subscribe(
      (data) => {
        console.log(data);
        this.alertServie.onCallAlert('Success Edited', AlertType.Success)
        this.router.navigate(['/dashboard/users']);
      },
      (err) => {
        this.alertServie.setAlert('Edited Failed', AlertType.Error)
        console.log(err);

      }
    );

    
  }

  subscribeData() {
    forkJoin(
      this.apiService.getEmployeebyId(this.id),
      this.apiService.getEmployeeStatus(),
      this.apiService.getDepartements(),
      this.apiService.getInstitutions(),
      this.apiService.getBank(),
    ).subscribe(([employee, status, dep, inst, bank]) => {
      this.user = employee;
      this.status = status;
      this.departments = dep;
      this.institutions = inst;
      this.banks = bank;

      this.f['nikInput'].setValue(this.user.nik);
      this.f['nameInput'].setValue(this.user.name);
      this.f['emailInput'].setValue(this.user.email);
      this.f['statusInput'].setValue(this.user.employeeStatusId);
      this.f['placeBirthInput'].setValue(this.user.placeOfBirth);
      this.f['dateBirthInput'].patchValue(
        this.formatDate(this.user.dateOfBirth)
      );
      this.f['genderInput'].setValue(this.user.gender);
      this.f['bloodInput'].setValue(this.user.blood);
      this.f['institutionInput'].setValue(this.user.institutionId);
      this.f['departmentInput'].setValue(this.user.departementId);
      this.f['bankInput'].setValue(this.user.bankId);
      this.f['majorInput'].setValue(this.user.major);
      this.f['studyInput'].setValue(this.user.existingEdu);
      this.f['longAppInput'].setValue(this.user.longApprentice);
      this.f['isActiveInput'].setValue(this.user.isActive);
      console.log(this.user.isActive);
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
