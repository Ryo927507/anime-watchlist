import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AnimeService } from '../../services/anime-service';
import { LoginService } from '../../services/login-service';
import { TabSelectionService } from '../../services/tab-selection-service';

@Component({
  selector: 'app-login-overlay',
  imports: [FormsModule],
  templateUrl: './login-overlay.html',
  styleUrl: './login-overlay.scss',
})
export class LoginOverlay {
  @Output() cancel = new EventEmitter<boolean>();

  constructor(
    private animeService: AnimeService,
    private loginService: LoginService,
    private tabSelectionService: TabSelectionService
  ) {}

  userName: string = '';
  errorMessage = '';
  isChecking = false;

  async login(): Promise<void> {
    if (this.isChecking) {
      return;
    }

    const normalizedUserName = this.loginService.normalizeUserName(this.userName);
    if (!normalizedUserName) {
      this.errorMessage = 'Bitte gib einen gültigen Benutzernamen ohne Schrägstrich ein.';
      return;
    }

    this.isChecking = true;
    this.errorMessage = '';

    let userExists: boolean;
    try {
      userExists = await this.animeService.userExists(normalizedUserName);
    } catch (error: unknown) {
      console.error('Benutzer-Collection konnte nicht in Firebase geprüft werden:', error);
      this.errorMessage = 'Der Benutzer konnte nicht in Firebase geprüft werden. Bitte prüfe die Verbindung und Berechtigungen.';
      this.isChecking = false;
      return;
    }

    this.isChecking = false;
    if (!userExists) {
      this.errorMessage = `Der Benutzer „${normalizedUserName}“ wurde nicht gefunden.`;
      return;
    }

    this.loginService.login(normalizedUserName);
    this.tabSelectionService.selectedTab = 1;
    this.cancel.emit(false);
  }
}
