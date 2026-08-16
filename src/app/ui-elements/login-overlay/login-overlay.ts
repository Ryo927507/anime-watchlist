import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginService } from '../../services/login-service';
import { TabSelectionService } from '../../services/tab-selection-service';

@Component({
  selector: 'app-login-overlay',
  imports: [FormsModule],
  templateUrl: './login-overlay.html',
  styleUrl: './login-overlay.scss',
})
export class EditOverlay {
  @Output() cancel = new EventEmitter<boolean>();

  constructor(
    private loginService: LoginService,
    private tabSelectionService: TabSelectionService
  ) {}

  userName: string = '';

  login() {
    const normalizedUserName = this.userName.trim();
    const isValidUser = this.loginService.users.includes(normalizedUserName);

    if (isValidUser) {
      this.loginService.currentUser = normalizedUserName;
      localStorage.setItem('currentUser', normalizedUserName);
      this.tabSelectionService.selectedTab = 1;
      this.cancel.emit(false);
    }
  }
}
