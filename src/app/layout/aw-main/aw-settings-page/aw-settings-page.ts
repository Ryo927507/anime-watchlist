import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginService } from '../../../services/login-service';
import { TabSelectionService } from '../../../services/tab-selection-service';
import { EditOverlay } from '../../../ui-elements/login-overlay/login-overlay';

@Component({
  selector: 'app-aw-settings-page',
  imports: [FormsModule, EditOverlay],
  templateUrl: './aw-settings-page.html',
  styleUrl: './aw-settings-page.scss',
})
export class AwSettingsPage implements OnInit {
  userName: string = '';

  isOverlayVisibile: boolean = true;

  constructor(
    public loginService: LoginService,
    public tabSelectionService: TabSelectionService
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser && this.loginService.users.includes(storedUser)) {
      this.userName = storedUser;
      this.loginService.currentUser = storedUser;
      this.isOverlayVisibile = false;
      this.tabSelectionService.selectedTab = 0;
    } else {
      this.tabSelectionService.selectedTab = 0;
      this.isOverlayVisibile = true;
    }
  }

  onCancel(event: boolean) {
    this.isOverlayVisibile = event;
    if (!event) {
      this.tabSelectionService.selectedTab = 1;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loginService.currentUser = '';
    this.userName = '';
    this.isOverlayVisibile = true;
    this.tabSelectionService.selectedTab = 0;
  }
}
