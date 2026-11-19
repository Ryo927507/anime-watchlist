import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Anime } from '../../models/anime.model';
import { SettingsOverlay } from '../../ui-overlays/settings-overlay/settings-overlay';

@Component({
  selector: 'app-anime-entry',
  imports: [MatIconModule, SettingsOverlay],
  templateUrl: './anime-entry.html',
  styleUrl: './anime-entry.scss',
})
export class AnimeEntry {
  @Input({ required: true }) anime!: Anime;
  @Input({ required: true }) root!: string;
}
