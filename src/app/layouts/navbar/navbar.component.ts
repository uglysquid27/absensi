import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as Aos from 'aos';
import { TokenStorageService } from 'src/app/service/auth/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: { '(document:click)': 'falseAll($event)' },
})
export class NavbarComponent {
  @ViewChild('avatarList') avatarList!: ElementRef;
  @ViewChild('signOutModal') ModalElement!: ElementRef;
  boolAvatar: any;
  boolAvatarDropdown: any;
  boolModal: boolean = false;
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
  falseAll(event: any) {
    // console.log(this.menuList.nativeElement);
    // console.log(event.target);

    if (
      !this.avatarList.nativeElement.contains(event.target) &&
      this.boolAvatarDropdown
    ) {
      if (
        this.ModalElement &&
        this.ModalElement.nativeElement.contains(event.target)
      ) {
        // console.log('test1');
      } else {
        this.boolAvatarDropdown = false;
      }
    }
  }
  avatarDropdown() {
    this.boolAvatarDropdown = !this.boolAvatarDropdown;
  }
  signOutModal() {
    this.boolModal = !this.boolModal;
  }
  signOut(event: any) {
    // console.log(event.target.id);
    if (event.target.id == 'yesBtn') {
      this.session.signOut();
      window.location.reload();
    } else {
      this.signOutModal();
    }
  }
}
