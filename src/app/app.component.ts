import { Component } from '@angular/core';
import { MasterService } from './service/master.service';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(public router: Router, private route:ActivatedRoute) {}

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  result: any;
  tanggal: any;
  total: any;
  chart: any = [];

  params:any;

  ngOnInit() {
    // console.log(this.router);


  }
}
