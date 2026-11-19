import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AnimeEntryModel } from '../../models/animeEntryModel.model';

import { AnimeService } from '../../services/anime-service';
import {
  ANIME_STATUS_OPTIONS,
  AnimeStatus,
} from '../../models/anime-status.model';

@Component({
  selector: 'app-add-overlay',
  imports: [FormsModule, MatIconModule],
  templateUrl: './add-overlay.html',
  styleUrl: './add-overlay.scss',
})
export class AddOverlay implements OnInit {
  @Input({ required: true }) root!: string;
  @Input() animeEntry?: AnimeEntryModel;

  @Output() cancel = new EventEmitter<boolean>();

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeTitle = this.animeEntry?.title_english ?? '';
    this.animeComment = this.animeEntry?.comment ?? '';
  }

  animeTitle = '';
  animeStatus: AnimeStatus | null = null;
  animeComment = '';
  isSaving = false;
  errorMessage = '';
  readonly statuses = ANIME_STATUS_OPTIONS;

  cancelButtonClicked() {
    this.cancel.emit(false);
  }

  async addToList(): Promise<void> {
    if (this.isSaving) {
      return;
    }

    const title = this.animeTitle.trim();
    const status = this.animeStatus;
    const comment = this.animeComment.trim();

    if (!title || !status) {
      this.errorMessage = 'Bitte gib einen Titel und einen Status ein.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    try {
      await this.animeService.addAnime(
        { title, status, comment },
        this.root
      );
      this.cancel.emit(false);
    } catch (error: unknown) {
      console.error('Anime konnte nicht zu Firebase hinzugefügt werden:', error);
      this.errorMessage = 'Der Anime konnte nicht gespeichert werden. Bitte versuche es erneut.';
    } finally {
      this.isSaving = false;
    }
  }
}
