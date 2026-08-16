import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimeItem } from '../models/animeItem.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeItemService {
  private http = inject(HttpClient);

  // Pfad zu deiner JSON-Datei im public/assets Ordner
  private jsonUrl = 'anime.json'; 

  getAnimeList(): Observable<AnimeItem[]> {
    return this.http.get<AnimeItem[]>(this.jsonUrl);
  }
}