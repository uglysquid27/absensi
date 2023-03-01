import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

var api = environment.baseUrlApi;

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient: HttpClient) { }

  getProfile() {
    return this.httpClient.get(api + "profile");
  }
  getEmployeeStatus(){
    return this.httpClient.get(api + 'employeestatus');
  }
}
