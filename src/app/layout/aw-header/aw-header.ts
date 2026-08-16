import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TabSelectionService } from '../../services/tab-selection-service';

@Component({
  selector: 'app-aw-header',
  imports: [MatIconModule],
  templateUrl: './aw-header.html',
  styleUrl: './aw-header.scss',
})
export class AwHeader {
  @Output() versionToggled = new EventEmitter<boolean>();

  constructor(public tabSelectionService: TabSelectionService) {}
  
  onSettingsButtonClick() {
    this.tabSelectionService.selectedTab = 0;
  }

  onTitleClick() {
    this.tabSelectionService.selectedTab = 1;
  }

  onAddButtonClick() {
    this.tabSelectionService.selectedTab = 2;
  }
}
