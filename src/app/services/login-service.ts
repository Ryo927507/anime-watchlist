import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUser: string = '';

  constructor() {
    const storedUser = this.normalizeUserName(localStorage.getItem('currentUser') ?? '');

    if (storedUser) {
      this.currentUser = storedUser;
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  login(userName: string): boolean {
    const normalizedUserName = this.normalizeUserName(userName);
    if (!normalizedUserName) {
      return false;
    }

    localStorage.setItem('currentUser', normalizedUserName);
    this.currentUser = normalizedUserName;
    return true;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = '';
  }

  normalizeUserName(userName: string): string | null {
    const normalizedUserName = userName.trim();
    return this.isValidUserName(normalizedUserName) ? normalizedUserName : null;
  }

  private isValidUserName(userName: string): boolean {
    return userName.length > 0 && !userName.includes('/');
  }
}
