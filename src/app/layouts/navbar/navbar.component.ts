import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public router: Router) {
    console.log(this.router.url)
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
