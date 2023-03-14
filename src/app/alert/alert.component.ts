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

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy, OnChanges {
  // constructor(private router: Router, private alertService: AlertService) {}

  // ngOnInit(): void {}
  // ngOnDestroy(): void {}

  @Input() id = 'default-alert';
  @Input() fade = true;
  show: Boolean = false;

  message: any;
  type: any;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('oh');
  }

  callAlert(alert: any) {
    if (alert.message != '') {
      this.show = true;
      this.message = alert.message;
      this.type = alert.type;

      setTimeout(() => {
        this.show = false;
        this.message = '';
        this.type = AlertType.None;
      }, 3000);
    }
    console.log(alert.message);

    console.log('');
  }

  ngOnInit() {
    if (this.alertService.subsVar == undefined) {
      this.alertService.subsVar = this.alertService.invokeAlert.subscribe(
        (alert) => {
          this.callAlert(alert);
        }
      );
    }
    // // subscribe to new alert notifications
    // this.alertSubscription = this.alertService
    //   .onAlert(this.id)
    //   .subscribe((alert) => {
    //     // clear alerts when an empty alert is received
    //     if (!alert.message) {
    //       // filter out alerts without 'keepAfterRouteChange' flag
    //       this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);
    //       // remove 'keepAfterRouteChange' flag on the rest
    //       this.alerts.forEach((x) => delete x.keepAfterRouteChange);
    //       return;
    //     }
    //     // add alert to array
    //     this.alerts.push(alert);
    //     // auto close alert if required
    //     if (alert.autoClose) {
    //       setTimeout(() => this.removeAlert(alert), 3000);
    //     }
    //   });
    // // clear alerts on location change
    // this.routeSubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     this.alertService.clear(this.id);
    //   }
    // });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    // this.alertSubscription.unsubscribe();
    // this.routeSubscription.unsubscribe();
  }

  // removeAlert(alert: Alert) {
  //   // check if already removed to prevent error on auto close
  //   if (!this.alerts.includes(alert)) return;

  //   // fade out alert if this.fade === true
  //   const timeout = this.fade ? 250 : 0;
  //   alert.fade = this.fade;

  //   setTimeout(() => {
  //     // filter alert out of array
  //     this.alerts = this.alerts.filter((x) => x !== alert);
  //   }, timeout);
  // }

  // cssClass(alert: Alert) {
  //   if (!alert) return;

  //   const classes = ['alert', 'alert-dismissible'];

  //   const alertTypeClass = {
  //     [AlertType.Success]: 'alert-success',
  //     [AlertType.Error]: 'alert-danger',
  //     [AlertType.Info]: 'alert-info',
  //     [AlertType.Warning]: 'alert-warning',
  //     [AlertType.None]: 'alert-warning',
  //   };

  //   if (alert.type !== undefined) {
  //     classes.push(alertTypeClass[alert.type]);
  //   }

  //   if (alert.fade) {
  //     classes.push('fade');
  //   }

  //   return classes.join(' ');
  // }
}
