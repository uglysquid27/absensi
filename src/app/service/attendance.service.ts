import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

var api = environment.baseUrlApi;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private httpClient: HttpClient) { }

  /* Employee ------------------------------------------------------------------------*/
  getProfile(): Observable<any> {
    return this.httpClient.get(api + 'profile');
  }
  getEmployeebyId(id: any): Observable<any> {
    return this.httpClient.get(api + 'employee/' + id);
  }
  getEmployeeStatusbyId(id: any) {
    return this.httpClient.get(api + 'employeestatus/' + id);
  }
  getEmployeeStatus() {
    return this.httpClient.get(api + 'employeestatus');
  }
  storeEmployeeStatus(body: any): Observable<any> {
    return this.httpClient.post(api + 'employeestatus', body);
  }
  updateEmployeeStatus(id: any, body: any) {
    return this.httpClient.put(api + 'employeestatus/' + id, body);
  }
  updateEmployee(id: any, body: any) {
    return this.httpClient.put(api + 'employee/' + id, body);
  }
  storeEmployee(body: any): Observable<any> {
    return this.httpClient.post(api + 'employee', body);
  }

  /* Attendance ------------------------------------------------------------------------*/
  getAttendance(): Observable<any> {
    return this.httpClient.get(api + 'attendance');
  }
  storeAttendance(body: any): Observable<any> {
    return this.httpClient.post(api + 'attendance', body);
  }
  getAmountAttendance(id: any): Observable<any> {
    return this.httpClient.get(api + 'countAttending/' + id);
  }
  isAttended(id: any): Observable<any> {
    return this.httpClient.get(api + 'isAttended/' + id);
  }

  /* Activities ------------------------------------------------------------------------*/
  getActivity(): Observable<any> {
    return this.httpClient.get(api + 'activities');
  }


  /* Other ------------------------------------------------------------------------*/
  getBank(): Observable<any> {
    return this.httpClient.get(api + 'banks');
  }
  getInstitutions(): Observable<any> {
    return this.httpClient.get(api + 'institutions');
  }
  getInstitutionsbyId(id: any) {
    return this.httpClient.get(api + 'institutions/' + id);
  }
  updateInstitutionsStatus(id: any, body: any) {
    return this.httpClient.put(api + 'institutions/' + id, body);
  }
  storeInstitutionsStatus(body: any): Observable<any> {
    return this.httpClient.post(api + 'institutions', body);
  }
  getDepartements(): Observable<any> {
    return this.httpClient.get(api + 'departements');
  }
  getDepartementsbyId(id: any) {
    return this.httpClient.get(api + 'departements/' + id);
  }
  UpdateDepartementsStatus(id: any, body: any) {
    return this.httpClient.put(api + 'departements/' + id, body);
  }
  storeDepartements(body: any): Observable<any> {
    return this.httpClient.post(api + 'departements', body);
  }

}
