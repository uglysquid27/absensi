import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  activityData: any;
  usersData: any;
  constructor(private apiService: AttendanceService) {
    apiService.getProfile().subscribe((data) => {
      this.usersData = data;
      console.log(this.usersData.data);
    });
    apiService.getActivity().subscribe((data) => {
      this.activityData = data.data;
      console.log(this.activityData);
    });
  }

  deleteUser(id: any) {
    

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEmployee(id).subscribe((data) => {
          this.apiService.getProfile().subscribe((data) => {
            this.usersData = data;
          })
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          }, (error) => {
            if(error.status == 400){
              Swal.fire(
                'Error!',
                'Data Employee tidak dapat dihapus karena masih dipakai pada tabel lain!.',
                'error'
              )
            } else {
              Swal.fire(
                'Error!',
                'Your file has not been deleted.',
                'error'
              )
            } 
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        
      }
    })
  }
}
