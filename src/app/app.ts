import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AwHeader } from "./aw-header/aw-header";
import { AwMain } from "./aw-main/aw-main";
import { AwFooter } from "./aw-footer/aw-footer";

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AwHeader, AwMain, AwFooter, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('anime-watchlist');
}
