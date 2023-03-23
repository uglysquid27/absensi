import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance.service';

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
  form!: FormGroup;
  user: any;
  status: any;
  departments: any;
  institutions: any;
  banks: any;

  get f() {
    return this.form.controls;
  }

  constructor(
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
      longInput: ['', Validators.required],
    });
    this.subscribeData();
  }
  onSubmit() {
    console.log(this.f['statusInput'].value);
  }

  subscribeData() {
    forkJoin(
      this.apiService.getEmployeebyId(this.id),
      this.apiService.getEmployeeStatus(),
      this.apiService.getDepartements(),
      this.apiService.getInstitutions(),
      this.apiService.getBank()
    ).subscribe(([employee, status, dep, inst, bank]) => {
      this.user = employee;
      this.status = status;
      this.departments = dep;
      this.institutions = inst;
      this.banks = bank;
      this.f['statusInput'].setValue(this.user.employeeStatusId);
      this.f['genderInput'].setValue(this.user.employeeStatusId);
      this.f['bloodInput'].setValue(this.user.employeeStatusId);
      this.f['institutionInput'].setValue(this.user.employeeStatusId);
      this.f['departmentInput'].setValue(this.user.employeeStatusId);
      this.f['bankInput'].setValue(this.user.employeeStatusId);
      console.log(this.user);
    });
  }
}
