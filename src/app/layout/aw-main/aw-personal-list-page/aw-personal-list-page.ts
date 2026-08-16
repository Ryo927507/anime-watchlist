import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";
import { AnimeEntry } from "../../../ui-elements/anime-entry/anime-entry";
import { AnimeEntryModel } from '../../../models/animeEntryModel.model';
import { AnimeService } from '../../../services/anime-service';
import { TabSelectionService } from '../../../services/tab-selection-service';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-aw-personal-list-page',
  imports: [MatIcon, AnimeEntry, AsyncPipe, FormsModule],
  templateUrl: './aw-personal-list-page.html',
  styleUrl: './aw-personal-list-page.scss',
})
export class AwPersonalListPage implements OnInit {
  // constructor
  constructor(
    private AnimeService: AnimeService,
    public tabSelectionService: TabSelectionService,
    public loginService: LoginService
  ) {}

  // variables
  watchedAnime$!: Observable<AnimeEntryModel[]>;
  outputAnime$!: Observable<AnimeEntryModel[]>;

  filterTitle: string = '';

  ngOnInit() {
    this.watchedAnime$ = this.AnimeService.getAnimeEntry(this.loginService.currentUser);
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

  // function to delete filter input
  deleteTitleInputFilter() {
    this.filterTitle = '';
    this.filterAnime();
  }

  // function to filter anime
  filterAnime() {
    const searchText = this.filterTitle.trim().toLowerCase();

    this.outputAnime$ = this.sortInput(
      this.watchedAnime$.pipe(
        map(animeArray =>
          animeArray.filter(anime =>
            anime.title_english.toLowerCase().includes(searchText)
          )
        )
      )
    );

    if (searchText === '') {
      this.outputAnime$ = this.sortInput(this.watchedAnime$);
    }
  }

  addIconClicked() {
    this.tabSelectionService.selectedTab = 2;
  }
}
