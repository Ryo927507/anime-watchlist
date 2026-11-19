import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-aw-header',
  imports: [MatIconModule],
  templateUrl: './aw-header.html',
  styleUrl: './aw-header.scss',
})
export class AwHeader {
  constructor(public loginService: LoginService) {}
}
