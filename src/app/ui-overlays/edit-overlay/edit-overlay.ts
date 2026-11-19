import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { Anime } from '../../models/anime.model';

import { AnimeService } from '../../services/anime-service';
import {
  ANIME_STATUS_OPTIONS,
  AnimeStatus,
  normalizeAnimeStatus,
} from '../../models/anime-status.model';

@Component({
  selector: 'app-edit-overlay',
  imports: [FormsModule, MatIconModule],
  templateUrl: './edit-overlay.html',
  styleUrl: './edit-overlay.scss',
})
export class EditOverlay implements OnInit {
  @Input({ required: true }) anime!: Anime;
  @Input({ required: true }) root!: string;

  @Output() cancel = new EventEmitter<boolean>();

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeTitle = this.anime.title;
    this.animeStatus = normalizeAnimeStatus(this.anime.status);
    this.animeComment = this.anime.comment ?? '';
  }

  animeTitle = '';
  animeStatus: AnimeStatus = 'Aktueller Stand';
  animeComment = '';
  isSaving = false;
  errorMessage = '';
  readonly statuses = ANIME_STATUS_OPTIONS;

  cancelButtonClicked() {
    this.cancel.emit(false);
  }

  async saveButtonClicked(): Promise<void> {
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
      await this.animeService.updateAnimeList(
        this.anime.id,
        { title, status, comment },
        this.root,
        this.root
      );
      this.anime.title = title;
      this.anime.status = status;
      this.anime.comment = comment;
      this.cancel.emit(false);
    } catch (error: unknown) {
      console.error('Anime konnte nicht in Firebase aktualisiert werden:', error);
      this.errorMessage = 'Die Änderungen konnten nicht gespeichert werden. Bitte versuche es erneut.';
    } finally {
      this.isSaving = false;
    }
  }
}
