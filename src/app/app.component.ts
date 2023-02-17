import { Component } from '@angular/core';
import { MasterService } from './service/master.service';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(public router: Router) {
    console.log(this.router.url)
  }

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  result: any;
  tanggal: any;
  total: any;
  chart: any = [];

  ngOnInit() {
  }
}
