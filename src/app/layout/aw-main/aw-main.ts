import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Anime } from '../../models/anime.model';
import { AnimeStatus } from '../../models/anime-status.model';
import { AnimeService } from '../../services/anime-service';
import { LoginService } from '../../services/login-service';
import { AddOverlay } from '../../ui-overlays/add-overlay/add-overlay';
import { AnimeEntry } from '../../ui-elements/anime-entry/anime-entry';

type SeenAnimeStatus = Exclude<AnimeStatus, 'Geplant'>;

@Component({
  selector: 'app-aw-main',
  imports: [FormsModule, MatIconModule, AnimeEntry, AddOverlay],
  templateUrl: './aw-main.html',
  styleUrl: './aw-main.scss',
})
export class AwMain implements OnInit {
  constructor(
    private animeService: AnimeService,
    public loginService: LoginService
  ) {}

  selectedList: 'seen' | 'planned' = 'seen';
  readonly selectedSeenStatuses = new Set<SeenAnimeStatus>();
  isSeenFilterExpanded = false;
  readonly seenStatusFilters: Array<'Alle' | SeenAnimeStatus> = [
    'Alle',
    'Geschaut',
    'Aktueller Stand',
    'Abgebrochen',
    'Begonnen',
  ];
  searchText = '';
  watchedAnime: Anime[] = [];
  plannedAnime: Anime[] = [];
  isLoading = true;
  loadError = '';
  isAddOverlayVisible = false;

  get animeCollection(): string {
    return this.loginService.currentUser;
  }

  get hasAnimeInSelectedList(): boolean {
    return this.selectedList === 'seen'
      ? this.watchedAnime.length > 0
      : this.plannedAnime.length > 0;
  }

  get isEmptySelectedList(): boolean {
    return !this.isLoading
      && !this.loadError
      && !this.hasAnimeInSelectedList;
  }

  ngOnInit(): void {
    this.animeService.getAnime(this.animeCollection).subscribe({
      next: (anime) => {
        this.watchedAnime = anime.filter(entry => entry.status !== 'Geplant');
        this.plannedAnime = anime.filter(entry => entry.status === 'Geplant');
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Anime konnten nicht aus Firebase geladen werden:', error);
        this.loadError = 'Die Anime konnten nicht geladen werden. Bitte versuche es später erneut.';
        this.isLoading = false;
      },
    });
  }

  get filteredAnime(): Anime[] {
    const search = this.searchText.trim().toLocaleLowerCase();
    const anime = this.selectedList === 'seen' ? this.watchedAnime : this.plannedAnime;

    return anime
      .filter((entry) =>
        this.selectedList !== 'seen'
        || this.selectedSeenStatuses.size === 0
        || Array.from(this.selectedSeenStatuses).some((status) => status === entry.status)
      )
      .filter((entry) => entry.title.toLocaleLowerCase().includes(search))
      .sort((a, b) => a.title.localeCompare(b.title, 'de', { sensitivity: 'base' }));
  }

  get selectedSeenStatusLabel(): string {
    if (this.selectedSeenStatuses.size === 0) {
      return 'Alle';
    }

    if (this.selectedSeenStatuses.size === 1) {
      return Array.from(this.selectedSeenStatuses)[0];
    }

    return `${this.selectedSeenStatuses.size} ausgewählt`;
  }

  isSeenStatusSelected(status: 'Alle' | SeenAnimeStatus): boolean {
    return status === 'Alle'
      ? this.selectedSeenStatuses.size === 0
      : this.selectedSeenStatuses.has(status);
  }

  toggleSeenStatus(status: 'Alle' | SeenAnimeStatus): void {
    if (status === 'Alle') {
      this.selectedSeenStatuses.clear();
      return;
    }

    if (this.selectedSeenStatuses.has(status)) {
      this.selectedSeenStatuses.delete(status);
    } else {
      this.selectedSeenStatuses.add(status);
    }
  }

  get groupedAnime(): { letter: string; entries: Anime[] }[] {
    const groups: { letter: string; entries: Anime[] }[] = [];

    for (const anime of this.filteredAnime) {
      const firstCharacter = anime.title.trim().charAt(0).toLocaleUpperCase('de');
      const normalizedCharacter = firstCharacter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const letter = /^[A-Z]$/.test(normalizedCharacter) ? normalizedCharacter : '#';
      const lastGroup = groups[groups.length - 1];

      if (lastGroup?.letter === letter) {
        lastGroup.entries.push(anime);
      } else {
        groups.push({ letter, entries: [anime] });
      }
    }

    return groups;
  }
}
