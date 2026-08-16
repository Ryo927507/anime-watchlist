import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Anime } from '../models/anime.model';
import { AnimeEntryModel } from '../models/animeEntryModel.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private firestore: Firestore) {}

  getAnime(root: string): Observable<Anime[]> {
    const animeRef = collection(this.firestore, root);
    return collectionData(animeRef, { idField: 'id' }) as Observable<Anime[]>;
  }

  addAnime(serie: Anime, root: string) {
    const animeRef = collection(this.firestore, root);
    return addDoc(animeRef, serie);
  }

  deleteAnime(id: string, root: string) {
    const animeDocRef = doc(this.firestore, `${root}/${id}`);
    return deleteDoc(animeDocRef);
  }

  // New structure
  getAnimeEntry(root: string): Observable<AnimeEntryModel[]> {
    const animeRef = collection(this.firestore, root);
    return collectionData(animeRef, { idField: 'id' }) as Observable<AnimeEntryModel[]>;
  }

  addAnimeEntry(serie: AnimeEntryModel, root: string) {
    const animeRef = collection(this.firestore, root);
    return addDoc(animeRef, serie);
  }

  deleteAnimeEntry(id: string, root: string) {
    const animeDocRef = doc(this.firestore, `${root}/${id}`);
    return deleteDoc(animeDocRef);
  }
}
