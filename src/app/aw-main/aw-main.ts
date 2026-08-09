import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Anime } from '../models/anime.model';
import { AnimeService } from '../services/anime-service';
import { TabSelectionService } from '../services/tab-selection-service';

@Component({
  selector: 'app-aw-main',
  imports: [ FormsModule, CommonModule, AsyncPipe, MatIconModule ],
  templateUrl: './aw-main.html',
  styleUrl: './aw-main.scss',
})
export class AwMain {
  // constructor
  constructor(
    private AnimeService: AnimeService, 
    public tabSelectionService: TabSelectionService
  ) {}

  // variables
  watchedAnime$!: Observable<Anime[]>;
  plannedAnime$!: Observable<Anime[]>;
  outputAnime$!: Observable<Anime[]>;
  filteredAnime$!: Observable<Anime[]>;

  errorWatched: boolean = false;
  errorPlaned: boolean = false;
  isEditing: boolean = false;
  isTabSelectorToggled: boolean = true;
  currentEditId: string = '';

  watchedId: string = '';
  watchedTitle: string = '';
  watchedStatus: string = '';

  planedId: string = '';
  planedTitle: string = '';
  planedStatus: string = '';

  editableTitle: string = '';
  editableStatus: string = '';

  filterTitle: string = '';
  filterStatus: string = '';

  // on init
  ngOnInit() {
    this.watchedAnime$ = this.AnimeService.getAnime('watchedAnime');
    this.plannedAnime$ = this.AnimeService.getAnime('planedAnime');
    this.outputAnime$ = this.sortInput(this.watchedAnime$);
  }

  // button function to add a watched anime
  addWatchedAnime(root: string) {
    if (this.watchedTitle == '' || this.watchedStatus == '') {
      this.errorWatched = true;
      return;
    } else {
      this.errorWatched = false;
    }

    this.AnimeService.addAnime({
      id: this.watchedId,
      title: this.watchedTitle,
      status: this.watchedStatus,
    }, root);

    this.watchedTitle = '';
    this.watchedStatus = '';
  }

  // button function to add a watched anime
  addPlanedAnime(root: string) {
    if (this.planedTitle == '') {
      this.errorPlaned = true;
      return;
    } else {
      this.errorPlaned = false;
    }

    this.AnimeService.addAnime({
      id: this.planedId,
      title: this.planedTitle,
      status: this.planedStatus,
    }, root);

    this.planedTitle = '';
  }

  // button function to edit anime
  editAnime(root: string, anime: Anime, editableStatus: string, editableTitle: string) {
    this.currentEditId = anime.id;
    this.editableTitle = anime.title;
    this.editableStatus = anime.status;

    if (this.isEditing) {
      // if (this.editableTitle === '' || this.editableStatus === '') {
      //   this.editError = true;
      //   return;
      // } else {
      //   this.AnimeService.deleteAnime(this.currentEditId);
        
      //   this.AnimeService.addAnime({
      //     id: this.currentEditId,
      //     title: editableTitle,
      //     status: editableStatus,
      //   });
        
      //   this.isEditing = false;
      // }
      
      this.AnimeService.deleteAnime(this.currentEditId, root);
      
      this.AnimeService.addAnime({
        id: this.currentEditId,
        title: editableTitle,
        status: editableStatus,
      }, root);
      
      this.isEditing = false;
    } else {
      this.isEditing = true;
    }
  }

  // button function to delete anime
  deleteAnime(root: string, id: string) {
    this.AnimeService.deleteAnime(id, root);
    this.isEditing = false;
  }

  // button function to toggle the Tab Selector To planed
  toggleTabSelectorWatched() {
    if (!this.isTabSelectorToggled) {
      this.isTabSelectorToggled = true;
      this.outputAnime$ = this.sortInput(this.watchedAnime$);
    } 
  }

  // button function to toggle the Tab Selector To planed
  toggleTabSelectorPlaned() {
    if (this.isTabSelectorToggled) {
      this.isTabSelectorToggled = false;
      this.outputAnime$ = this.sortInput(this.plannedAnime$);
    }
  }

  // function to sort anime by title
  sortInput(anime$: Observable<Anime[]>): Observable<Anime[]> {
    return anime$.pipe(
      map(animeArray =>
        [...animeArray].sort((a, b) => a.title.localeCompare(b.title))
      )
    );
  }

  // function to filter anime
  filterAnime() {
    if (this.filterTitle === '' && this.filterStatus === '') {
      this.outputAnime$ = this.sortInput(this.watchedAnime$);
      return;
    }

    if (this.isTabSelectorToggled) {
      this.filteredAnime$ = this.sortInput(
        this.watchedAnime$.pipe(
          map(animeArray =>
            [...animeArray].filter(anime => anime.title.toLowerCase().includes(this.filterTitle.toLowerCase()))
          )
        )
      );
      this.outputAnime$ = this.sortInput(
        this.filteredAnime$.pipe(
          map(animeArray =>
            [...animeArray].filter(anime => anime.status.toLowerCase().includes(this.filterStatus.toLowerCase()))
          )
        )
      );
    } else {
      this.filteredAnime$ = this.sortInput(
        this.plannedAnime$.pipe(
          map(animeArray =>
            [...animeArray].filter(anime => anime.title.toLowerCase().includes(this.filterTitle.toLowerCase()))
          )
        )
      );
      this.outputAnime$ = this.sortInput(
        this.filteredAnime$.pipe(
          map(animeArray =>
            [...animeArray].filter(anime => anime.status.toLowerCase().includes(this.filterStatus.toLowerCase()))
          )
        )
      );
    }
  }

  // function to change background color
  changeColor(animeStatus: string): string {
    if (animeStatus === 'Geschaut') {
      return '#90ee90';
    } else if (animeStatus === 'Nicht fertig geschaut') {
      return '#ff8f8d';
    } else if (animeStatus === 'Aktueller Stand') {
      return '#90ee90';
    } else if (animeStatus === 'Läuft aktuell') {
      return '#ffff52';
    } else if (animeStatus === 'Fertig, evtl. Fortsetzung') {
      return '#ffff52';
    } else if (animeStatus === 'Abgebrochen') {
      return '#ff8f8d';
    } else if (animeStatus === '') {
      return '#bebebe';
    } else {
      return '#ff8f8d';
    } 
  }

  // function to delete filter input
  // filter
  deleteTitleInputFilter() {
    this.filterTitle = '';
    this.filterAnime();
  }

  deleteStatusInputFilter() {
    this.filterStatus = '';
    this.filterAnime();
  }

  // edit
  deleteTitleInputEdit() {
    this.editableTitle = '';
    this.filterAnime();
  }

  deleteStatusInputEdit() {
    this.editableStatus = '';
    this.filterAnime();
  }

  // add watched
  deleteTitleInputAddWatched() {
    this.watchedTitle = '';
    this.filterAnime();
  }

  deleteStatusInputAddWatched() {
    this.watchedStatus = '';
    this.filterAnime();
  }

  // add planed
  deleteTitleInputAddPlaned() {
    this.planedTitle = '';
    this.filterAnime();
  }

  // function to change a directory from the database
  // changeDirectory(anime: Anime) {
  //   this.AnimeService.deleteAnime(anime.id, 'anime');
  //   this.AnimeService.addAnime({
  //     id: this.currentEditId,
  //     title: anime.title,
  //     status: anime.status,
  //   }, 'watchedAnime');
  // }
}
