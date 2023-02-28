import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Aos from 'aos';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public router: Router) {}

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  ngOnInit() {
    Aos.init({
      duration: 1200,
    });
  }

}
