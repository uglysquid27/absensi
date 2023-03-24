import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getProfile() {
    return this.httpClient.get(api + 'profile');
  }
  getEmployeebyId(id: any) {
    return this.httpClient.get(api + 'employee/' + id);
  }
  getEmployeeStatus() {
    return this.httpClient.get(api + 'employeestatus');
  }
  updateEmployee(id: any, body: any) {
    return this.httpClient.put(api + 'employee/' + id, body);
  }
  getBank() {
    return this.httpClient.get(api + 'banks');
  }
  getInstitutions() {
    return this.httpClient.get(api + 'institutions');
  }
  getDepartements() {
    return this.httpClient.get(api + 'departements');
  }
}
