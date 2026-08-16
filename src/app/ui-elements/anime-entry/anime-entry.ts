import { Component, inject, Input, OnInit } from '@angular/core';
import { AnimeItemService } from '../../services/animeItem-service';
import { MatIcon } from "@angular/material/icon";

import { AnimeItem } from '../../models/animeItem.model';
import { AnimeEntryModel } from '../../models/animeEntryModel.model';

import { SettingsOverlay } from "../settings-overlay/settings-overlay";

@Component({
  selector: 'app-anime-entry',
  imports: [MatIcon, SettingsOverlay],
  templateUrl: './anime-entry.html',
  styleUrl: './anime-entry.scss',
})
export class AnimeEntry implements OnInit {
  @Input() animeItem: number = 0;
  @Input() animeEntry!: AnimeEntryModel;

  private animeService = inject(AnimeItemService);
  animeList: AnimeItem[] = [];
  
  ngOnInit(): void {
    this.animeService.getAnimeList().subscribe({
      next: (data) => this.animeList = data,
      error: (err) => console.error('Fehler beim Laden der Animes:', err)
    });
  }
}
