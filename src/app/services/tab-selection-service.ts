import { Injectable } from '@angular/core';

import { LoginService } from './login-service';

@Injectable({
  providedIn: 'root',
})
export class TabSelectionService {
  selectedTab: number = 0;

  constructor(
    private loginService: LoginService
  ) {
    this.selectedTab = this.loginService.currentUser ? 1 : 0;
  }
}
