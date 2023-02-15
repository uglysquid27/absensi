import { Component } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-peserta',
  templateUrl: './peserta.component.html',
  styleUrls: ['./peserta.component.css']
})
export class PesertaComponent {

  constructor(){}

  ngOnInit() {
    Aos.init({
      duration: 1200,
    });
  }

}
