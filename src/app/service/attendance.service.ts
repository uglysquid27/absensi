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
  constructor(private httpClient: HttpClient) {}

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
  deleteEmployee(id: any) {
    return this.httpClient.delete(api + 'employee/' + id);
  }

  /* Attendance ------------------------------------------------------------------------*/
  getAttendance(): Observable<any> {
    return this.httpClient.get(api + 'attendance');
  }
  getAttendanceByNik(id: any): Observable<any> {
    return this.httpClient.get(api + 'attendance/' + id);
  }
  getTwoMonthAttendances(): Observable<any> {
    return this.httpClient.get(api + 'attendance/two');
  }
  storeAttendance(body: any): Observable<any> {
    return this.httpClient.post(api + 'attendance', body);
  }
  updateAttendance(body: any, id: any): Observable<any> {
    return this.httpClient.post(api + 'attendance/update/' + id, body);
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
  storeActivity(body: any): Observable<any> {
    return this.httpClient.post(api + 'activities', body);
  }
  showActivity(id: any): Observable<any> {
    return this.httpClient.get(api + 'showActivities/' + id);
  }
  deleteActivity(id: any): Observable<any> {
    return this.httpClient.delete(api + 'activities/' + id);
  }
  getActivitybyId(id: any): Observable<any> {
    return this.httpClient.get(api + 'getActivities/' + id);
  }
  updateActivity(id: any, body: any): Observable<any> {
    return this.httpClient.put(api + 'activities/' + id, body);
  }

  /* Documents ------------------------------------------------------------------------*/
  getDocument(): Observable<any> {
    return this.httpClient.get(api + 'documents');
  }
  storeDocument(body: any): Observable<any> {
    return this.httpClient.post(api + 'documents', body);
  }
  getDocumentbyId(id: any): Observable<any> {
    return this.httpClient.get(api + 'documents/' + id);
  }
  updateDocument(id: any, body: any) {
    return this.httpClient.put(api + 'documents/' + id, body);
  }
  deleteDocument(id: any) {
    return this.httpClient.delete(api + 'documents/' + id);
  }

  /* Banks ------------------------------------------------------------------------*/
  getBank(): Observable<any> {
    return this.httpClient.get(api + 'banks');
  }
  deleteBank(id: any) {
    return this.httpClient.delete(api + 'banks/' + id);
  }

  /* Other ------------------------------------------------------------------------*/
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
  deleteInstitutions(id: any) {
    return this.httpClient.delete(api + 'institutions/' + id);
  }

  /* Departement ------------------------------------------------------------------------*/
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
  deleteDepartements(id: any) {
    return this.httpClient.delete(api + 'departements/' + id);
  }

  /* Approvals ---------------------------------------------------------------------------*/
  getApprovals(): Observable<any> {
    return this.httpClient.get(api + 'approvals');
  }
  storeApproval(body:any): Observable<any> {
    return this.httpClient.post(api + 'approval', body);
  }
}
