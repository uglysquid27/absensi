import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  id = this.activeRoute.snapshot.paramMap.get('id');
  user: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: AttendanceService
  ) {
    apiService.getEmployeebyId(this.id).subscribe((data) => {
      this.user = data;
    });
  }
}
