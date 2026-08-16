import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";
import { AnimeEntry } from "../../../ui-elements/anime-entry/anime-entry";
import { AnimeEntryModel } from '../../../models/animeEntryModel.model';
import { AnimeItem } from '../../../models/animeItem.model';
import { AnimeItemService } from '../../../services/animeItem-service';
import { AnimeService } from '../../../services/anime-service';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-aw-explore-page',
  imports: [MatIcon, AnimeEntry, AsyncPipe, FormsModule],
  templateUrl: './aw-explore-page.html',
  styleUrl: './aw-explore-page.scss',
})
export class AwExplorePage implements OnInit {
  // constructor
  constructor(
    private AnimeItemService: AnimeItemService,
    private AnimeService: AnimeService,
    public loginService: LoginService
  ) {}

  // variables
  animeList$!: Observable<AnimeItem[]>;
  personalAnimeList$!: Observable<AnimeEntryModel[]>;
  exploreAnime$!: Observable<AnimeEntryModel[]>;
  outputAnime$!: Observable<AnimeEntryModel[]>;
  maxPages$!: Observable<number>;

  filterTitle: string = '';
  currentPage: number = 0;

  ngOnInit() {
    this.animeList$ = this.AnimeItemService.getAnimeList();
    this.personalAnimeList$ = this.AnimeService.getAnimeEntry(this.loginService.currentUser);
    this.exploreAnime$ = combineLatest([this.animeList$, this.personalAnimeList$]).pipe(
      map(([animeList, personalList]) => this.filterAlreadyAddedAnime(animeList, personalList)),
      shareReplay(1)
    );
    this.outputAnime$ = this.exploreAnime$;
    this.maxPages$ = this.outputAnime$.pipe(
      map(anime => Math.ceil(anime.length / 25))
    );
    this.filterAnime();
  }

  // function to sort anime by title
  sortInput(anime$: Observable<AnimeEntryModel[]>): Observable<AnimeEntryModel[]> {
    return anime$.pipe(
      map(animeArray =>
        [...animeArray].sort((a, b) => a.title_english.localeCompare(b.title_english))
      )
    );
  }

  filterAlreadyAddedAnime(animeList: AnimeItem[], personalList: AnimeEntryModel[]): AnimeEntryModel[] {
    const personalAnimeKeys = new Set(
      personalList.flatMap((entry) => [
        this.normalizeValue(entry.id),
        this.normalizeValue(entry.title_english)
      ])
    );

    return this.convertAnimeItemListToAnimeEntryModel(animeList).filter((anime) => {
      const hasSameId = personalAnimeKeys.has(this.normalizeValue(anime.id));
      const hasSameTitle = personalAnimeKeys.has(this.normalizeValue(anime.title_english));

      return !hasSameId && !hasSameTitle;
    });
  }

  private normalizeValue(value: string | undefined | null): string {
    return (value ?? '').trim().toLowerCase();
  }

  //function to convert AnimeItem to AnimeEntryModel
  convertAnimeItemToAnimeEntryModel(animeListParameter: Observable<AnimeItem[]>): Observable<AnimeEntryModel[]> {
    return animeListParameter.pipe(
      map((animeList: AnimeItem[]) => this.convertAnimeItemListToAnimeEntryModel(animeList))
    );
  }

  private convertAnimeItemListToAnimeEntryModel(animeList: AnimeItem[]): AnimeEntryModel[] {
    const animeEntryListToReturn: AnimeEntryModel[] = [];

    for (let i = 0; i < animeList.length; i++) {
      const currentAnime = animeList[i];

      const title = currentAnime.title_english
        ? currentAnime.title_english
        : currentAnime.title_japanese
          ? currentAnime.title_japanese
          : 'Unbekannter Titel';

      animeEntryListToReturn.push({
        id: currentAnime.mal_id,
        title_english: title,
        type: currentAnime.type,
        episodes: currentAnime.episodes,
        score: currentAnime.score,
        year: currentAnime.year,
        image_url: currentAnime.image_url,
        status: 'Explore',
        comment: ''
      });
    }

    return animeEntryListToReturn;
  }

  // function to delete filter input
  deleteTitleInputFilter() {
    this.filterTitle = '';
    this.filterAnime();
  }

  // function to filter anime
  filterAnime() {
    const searchText = this.filterTitle.trim().toLowerCase();

    if (searchText === '') {
      // No filter: use the original list without sorting
      this.outputAnime$ = this.exploreAnime$;
    } else {
      // With filter: sort alphabetically and filter by search text
      this.outputAnime$ = this.sortInput(
        this.exploreAnime$.pipe(
          map(animeArray =>
            animeArray.filter(anime =>
              anime.title_english.toLowerCase().includes(searchText)
            )
          )
        )
      );
    }

    // Update max pages based on output anime
    this.maxPages$ = this.outputAnime$.pipe(
      map(anime => Math.ceil(anime.length / 25))
    );
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    this.currentPage++;
  }
}
