import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Aos from 'aos';
import { TokenStorageService } from 'src/app/service/auth/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  boolAvatar: any;
  boolAvatarDropdown: any;
  constructor(public router: Router, public session: TokenStorageService) {}

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  ngOnInit() {
    Aos.init({
      duration: 1200,
    });
    if (this.session.getToken()) {
      this.boolAvatar = true;
    }
  }
  avatarDropdown() {
    this.boolAvatarDropdown = !this.boolAvatarDropdown;
  }
  signOut() {
    this.session.signOut();
    window.location.reload();
  }
}
