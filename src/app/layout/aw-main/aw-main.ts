import { Component } from '@angular/core';

import { AwSettingsPage } from "../../layout/aw-main/aw-settings-page/aw-settings-page";
import { AwPersonalListPage } from "../../layout/aw-main/aw-personal-list-page/aw-personal-list-page";
import { AwExplorePage } from "../../layout/aw-main/aw-explore-page/aw-explore-page";

import { TabSelectionService } from '../../services/tab-selection-service';

@Component({
  selector: 'app-aw-main',
  imports: [ AwSettingsPage, AwPersonalListPage, AwExplorePage ],
  templateUrl: './aw-main.html',
  styleUrl: './aw-main.scss',
})
export class AwMain {
  constructor (
    public tabSelectionService: TabSelectionService
  ) {}
}
