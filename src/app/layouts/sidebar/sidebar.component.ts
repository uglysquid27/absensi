import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  boolDropdown: Boolean = false;
  constructor(public router: Router) {
    // console.log(this.router.url)
  }

  dropdown() {
    this.boolDropdown = !this.boolDropdown;
  }
}
