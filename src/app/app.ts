import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { AwHeader } from "./layout/aw-header/aw-header";
import { AwMain } from "./layout/aw-main/aw-main";
import { AwFooter } from "./layout/aw-footer/aw-footer";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AwHeader, AwMain, AwFooter, MatIconModule ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('anime-watchlist');
}
