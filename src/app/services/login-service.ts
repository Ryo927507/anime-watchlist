import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUser: string = '';

  users: string[] = [
    'watchedAnimeList',
    'Ry0nosk3',
    'Hanifi#5'
  ]
}
