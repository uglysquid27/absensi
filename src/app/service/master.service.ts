import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// const apiKey = 'coinrankingc032026f93e3b94c047c89523ca837327c4dac81e1070686';
var apikey = "http://localhost:3000/api";

@Injectable({
  providedIn: 'root',
})
export class MasterService {

  constructor(private http: HttpClient) {}


  patientVisit() {
    return this.http.get(apikey + '/date.month');
  }
  patiendData(): Observable<any> {
    return this.http.get(apikey + '/patient');
  }
  visit(): Observable<any> {
    return this.http.get(apikey + '/visit');
  }
}