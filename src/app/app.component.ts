import { Component } from '@angular/core';
import { MasterService } from './service/master.service';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { AlertType } from './service/alert/alert.model';
import { AlertService } from './service/alert/alert.service';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private idle: Idle,
    private alertService: AlertService,
    private keepLive: Keepalive
  ) {}

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  result: any;
  tanggal: any;
  total: any;
  chart: any = [];

  params: any;

  ngOnInit() {
    this.idle.setIdle(5);
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleStart.subscribe(() => {
      console.log('Session Di Mulai');
    });
    this.idle.onTimeout.subscribe(() => {
      console.log('Session Habis');

      this.alertService.setAlert('Session Habis', AlertType.Warning);
    });

    this.keepLive.interval(15);
  }
}
