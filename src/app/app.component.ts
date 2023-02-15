import { Component } from '@angular/core';
import { MasterService } from './service/master.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  result: any;
  tanggal: any;
  total: any;
  chart: any = [];

  constructor() {}

  ngOnInit() {
  }
}
