import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Aos from 'aos';

@Component({
  selector: 'app-peserta',
  templateUrl: './peserta.component.html',
  host: { class: 'flex justify-center' },
  styleUrls: ['./peserta.component.css'],
})
export class PesertaComponent {
  constructor(public router: Router) {
    console.log(this.router.url);
  }

  ngOnInit() {
    Aos.init({
      duration: 1200,
    });
  }
}
