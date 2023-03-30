import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  boolDropdown: Boolean = false;
  hideElement: Boolean = true;
  constructor(public router: Router) {
    // console.log(this.router.url)
  }
  onMouseEnter() {
    this.hideElement = false;
    console.log(this.hideElement);
    
  }
  onMouseOut() {
    console.log('out');
    this.boolDropdown = false;
    this.hideElement = true;
    console.log(this.hideElement);
    
  }

  dropdown() {
    this.boolDropdown = !this.boolDropdown;
  }
}
