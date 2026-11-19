import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginService } from '../../../services/login-service';
import { TabSelectionService } from '../../../services/tab-selection-service';
import { LoginOverlay } from '../../../ui-overlays/login-overlay/login-overlay';

@Component({
  selector: 'app-aw-settings-page',
  imports: [FormsModule, LoginOverlay],
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
    if (this.loginService.currentUser) {
      this.userName = this.loginService.currentUser;
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
    this.loginService.logout();
    this.userName = '';
    this.isOverlayVisibile = true;
    this.tabSelectionService.selectedTab = 0;
  }
}
