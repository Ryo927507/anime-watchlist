import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabSelectionService {
  selectedTab: number = 1;
}
