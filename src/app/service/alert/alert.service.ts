import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertOptions, AlertType } from './alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private message = '';

  private type!: AlertType;
  invokeAlert = new EventEmitter();
  subsVar: Subscription | undefined;

  setAlert(message: string, type: AlertType) {
    this.message = message;
    this.type = type;
  }
  getAlert() {
    return { mess: this.message, typ: this.type };
  }
  clearAlert() {
    this.message = '';
    this.type = AlertType.None;
  }
  onCallAlert(message: string, type: AlertType) {
    this.invokeAlert.emit({ message, type });
  }

  constructor() {}
}
