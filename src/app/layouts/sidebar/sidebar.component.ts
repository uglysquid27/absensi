import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/auth/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  host: { '(document:click)': 'falseAll($event)' },
})
export class SidebarComponent {
  @ViewChild('signOutModal') ModalElement!: ElementRef;
  boolModal: boolean = false;
  boolDropdown: Boolean = false;
  hideElement: Boolean = true;
  boolAcc: Boolean = false;

  constructor(public router: Router, private session: TokenStorageService) {
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
  AccountDropdown() {
    this.boolAcc = !this.boolAcc;
  }

  falseAll(event: any) {
    // console.log(this.menuList.nativeElement);
    // console.log(event.target);

    if (
      this.ModalElement &&
      this.ModalElement.nativeElement.contains(event.target)
    ) {
      // console.log('test1');
    }
  }
  signOutModal() {
    this.boolModal = !this.boolModal;
  }
  signOut(event: any) {
    // console.log(event.target.id);
    if (event.target.id == 'yesBtn') {
      this.session.signOut();

    } else {
      this.signOutModal();
    }
  }
}
