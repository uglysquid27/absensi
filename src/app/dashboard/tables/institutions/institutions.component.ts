import { Component } from '@angular/core';
import { AttendanceService } from 'src/app/service/attendance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.css']
})
export class InstitutionsComponent {
  usersData: any;
  constructor(private apiService: AttendanceService) {
    apiService.getInstitutions().subscribe((data) => {
      this.usersData = data;
      console.log(this.usersData.data);
    });
  }

  deleteInstitution(id: any) {
    

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
        this.apiService.deleteInstitutions(id).subscribe((data) => {
          this.apiService.getInstitutions().subscribe((data) => {
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
                'Data Institusi tidak dapat dihapus karena masih dipakai pada tabel lain!.',
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
