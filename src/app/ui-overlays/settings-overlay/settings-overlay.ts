import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { EditOverlay } from '../edit-overlay/edit-overlay';
import { AddOverlay } from '../add-overlay/add-overlay';

import { AnimeEntryModel } from '../../models/animeEntryModel.model';
import { Anime } from '../../models/anime.model';

import { AnimeService } from '../../services/anime-service';

@Component({
  selector: 'app-settings-overlay',
  imports: [MatIconModule, EditOverlay, AddOverlay],
  templateUrl: './settings-overlay.html',
  styleUrl: './settings-overlay.scss',
})
export class SettingsOverlay {
  @Input({ required: true }) anime!: Anime;
  @Input({ required: true }) root!: string;

  constructor(private animeService: AnimeService) {}

  isSettingsOverlayVisible = false;
  isEditOverlayVisible = false;
  isAddOverlayVisible = false;
  isDeleting = false;
  errorMessage = '';

  get animeEntryForAdding(): AnimeEntryModel {
    return {
      id: this.anime.id,
      title_english: this.anime.title,
      type: '',
      episodes: 0,
      score: 0,
      year: 0,
      image_url: '',
      status: 'Explore',
      comment: this.anime.comment ?? '',
    };
  }

  onSettingsClick() {
    this.isSettingsOverlayVisible = !this.isSettingsOverlayVisible;
  }

  onAddClick() {
    this.isAddOverlayVisible = true;
  }

  onEditClick() {
    this.isSettingsOverlayVisible = false;
    this.isEditOverlayVisible = true;
  }

  async onDeleteClick(): Promise<void> {
    if (this.isDeleting) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    try {
      await this.animeService.deleteAnime(this.anime.id, this.root);
      this.isSettingsOverlayVisible = false;
    } catch (error: unknown) {
      console.error('Anime konnte nicht aus Firebase gelöscht werden:', error);
      this.errorMessage = 'Der Anime konnte nicht gelöscht werden. Bitte versuche es erneut.';
    } finally {
      this.isDeleting = false;
    }
  }

  onEditCancel(event: boolean) {
    this.isEditOverlayVisible = event;
  }

  onAddCancel(event: boolean) {
    this.isAddOverlayVisible = event;
  }
}
