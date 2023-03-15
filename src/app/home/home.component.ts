import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { TokenStorageService } from '../service/auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private session: TokenStorageService) {}

  ngOnInit() {
    // console.log(this.session.getUser().name);
    Aos.init({
      duration: 1200,
    });
  }
}
