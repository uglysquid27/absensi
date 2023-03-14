import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertOptions, AlertType } from './alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';
  private status = '';
  private message = '';
  private boolSuccess = false;
  private boolError = false;
  private boolWarning = false;
  private type!: AlertType;
  invokeAlert = new EventEmitter();
  subsVar: Subscription | undefined;

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  error(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  info(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  warn(message: string, options?: AlertOptions) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // main alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }

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
