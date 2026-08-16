import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AnimeEntryModel } from '../../models/animeEntryModel.model';

import { AnimeService } from '../../services/anime-service';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-edit-overlay',
  imports: [ FormsModule ],
  templateUrl: './edit-overlay.html',
  styleUrl: './edit-overlay.scss',
})
export class EditOverlay {
  @Input() animeEntry!: AnimeEntryModel;

  @Output() cancel = new EventEmitter<boolean>();

  constructor(
    private AnimeService: AnimeService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.animeStatus = this.animeEntry.status;
    this.animeComment = this.animeEntry.comment;
  }

  animeStatus: string = '';
  animeComment: string = '';

  cancelButtonClicked() {
    this.cancel.emit(false);
  }

  saveButtonClicked() {
    this.AnimeService.deleteAnimeEntry(this.animeEntry.id, this.loginService.currentUser);
    
    this.animeEntry.status = this.animeStatus;
    this.animeEntry.comment = this.animeComment;
    this.AnimeService.addAnimeEntry(this.animeEntry, this.loginService.currentUser);
  }
}
