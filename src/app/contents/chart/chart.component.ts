import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MasterService } from '../../service/master.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  result: any;
  tanggal: any;
  total: any;
  chart: any = [];

  constructor(private service: MasterService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.service.patientVisit().subscribe(data => {
      this.result = data;
      console.log(this.result);
      
      
      this.tanggal = this.result.map((patient: any) => patient.month);
      this.total = this.result.map((patient: any) => patient.total);
      console.log(this.tanggal);

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.tanggal,
          datasets: [
            {
              data: this.tanggal,
              borderColor: '#3e95cd',
              label: 'Jumlah Pengunjung',
              backgroundColor: '#111827',
              // borderWidth: 3,
            },
          ],
        },
        options: {responsive:true} 
      });
    });
  }
}

  


