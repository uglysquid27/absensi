import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MasterService } from '../../service/master.service';
import { IPatient } from "./patient";
Chart.register(...registerables);

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent {
  listPatients: IPatient[] = [];
  posts: Object | undefined;

  constructor(private service: MasterService) {
  }

  ngOnInit() {
    this.service.visit()
        .subscribe((response: IPatient[]) => {
          this.posts = response;
          this.listPatients = response;
          console.log(this.listPatients[0])
          console.log(this.posts);
          
          
        });
  }
}
