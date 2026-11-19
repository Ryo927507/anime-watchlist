import { Component } from '@angular/core';

import { AwHeader } from "./layout/aw-header/aw-header";
import { AwMain } from "./layout/aw-main/aw-main";
import { AwFooter } from "./layout/aw-footer/aw-footer";
import { LoginService } from "./services/login-service";
import { LoginOverlay } from "./ui-overlays/login-overlay/login-overlay";


@Component({
  selector: 'app-root',
  imports: [AwHeader, AwMain, AwFooter, LoginOverlay],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(public loginService: LoginService) {}
}
