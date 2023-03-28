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

  getProfile():Observable<any> {
    return this.httpClient.get(api + 'profile');
  }
  getEmployeebyId(id: any):Observable<any> {
    return this.httpClient.get(api + 'employee/' + id);
  }
  getEmployeeStatus():Observable<any> {
    return this.httpClient.get(api + 'employeestatus');
  }
  updateEmployee(id: any, body: any) {
    return this.httpClient.put(api + 'employee/' + id, body);
  }
  storeEmployee(body: any):Observable<any> {
    return this.httpClient.post(api + 'employee', body);
  }
  getAttendance():Observable<any> {
    return this.httpClient.get(api + 'attendance');
  }
  getActivity(): Observable<any> {
    return this.httpClient.get(api + 'activities');
  }
  getBank():Observable<any> {
    return this.httpClient.get(api + 'banks');
  }
  getInstitutions():Observable<any> {
    return this.httpClient.get(api + 'institutions');
  }
  getDepartements():Observable<any> {
    return this.httpClient.get(api + 'departements');
  }
}
