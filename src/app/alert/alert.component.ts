import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Alert, AlertType } from '../service/alert/alert.model';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../service/alert/alert.service';
import { alertAnimate } from './animation.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [alertAnimate],
})
export class AlertComponent implements OnInit, OnDestroy, OnChanges {
  show: Boolean = false;

  message: any;
  type: any;

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  callAlert(alert: any) {
    if (alert.message != '') {
      this.show = true;
      this.message = alert.message;
      this.type = alert.type;

      setTimeout(() => {
        this.show = false;
        this.message = '';
        this.type = AlertType.None;
      }, 4000);
    }
  }

  ngOnInit() {
    if (this.alertService.subsVar == undefined) {
      this.alertService.subsVar = this.alertService.invokeAlert.subscribe(
        (alert) => {
          this.callAlert(alert);
        }
      );
    }
    //
  }

  ngOnDestroy() {}
}
