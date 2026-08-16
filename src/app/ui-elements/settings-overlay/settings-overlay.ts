import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

import { EditOverlay } from "../edit-overlay/edit-overlay";
import { AddOverlay } from "../add-overlay/add-overlay";

import { AnimeEntryModel } from '../../models/animeEntryModel.model';

import { AnimeService } from '../../services/anime-service';
import { TabSelectionService } from '../../services/tab-selection-service';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-settings-overlay',
  imports: [MatIcon, EditOverlay, AddOverlay],
  templateUrl: './settings-overlay.html',
  styleUrl: './settings-overlay.scss',
})
export class SettingsOverlay {
  @Input() animeEntry!: AnimeEntryModel;

  // constructor
  constructor(
    private AnimeService: AnimeService,
    public TabSelectionService: TabSelectionService,
    public loginService: LoginService
  ) {}

  isSettingsOverlayVisible: boolean = false;
  isEditOverlayVisibile: boolean = false;
  isAddOverlayVisibile: boolean = false;

  onEditIconClick() {
    this.isSettingsOverlayVisible = !this.isSettingsOverlayVisible;
  }

  onAddIconClick() {
    this.isAddOverlayVisibile = !this.isAddOverlayVisibile;
  }

  onEditClick() {
    this.isEditOverlayVisibile = true;
  }

  onDeleteClick() {
    this.AnimeService.deleteAnimeEntry(this.animeEntry?.id || '', this.loginService.currentUser);
  }

  onEditCancel(event: boolean) {
    this.isEditOverlayVisibile = event;
  }

  onAddCancel(event: boolean) {
    this.isAddOverlayVisibile = event;
  }
}
