import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  writeBatch,
  getDocs,
  getDoc,
  limit,
  query,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Anime } from '../models/anime.model';
import { AnimeEntryModel } from '../models/animeEntryModel.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private firestore: Firestore) {}

  async userExists(userName: string): Promise<boolean> {
    const userRef = doc(this.firestore, `users/${userName}`);
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.exists() || this.hasDocuments(userName);
  }

  async hasDocuments(root: string): Promise<boolean> {
    const animeRef = query(collection(this.firestore, root), limit(1));
    const snapshot = await getDocs(animeRef);
    return !snapshot.empty;
  }

  getAnime(root: string): Observable<Anime[]> {
    const animeRef = collection(this.firestore, root);
    return (collectionData(animeRef, { idField: 'id' }) as Observable<Partial<Anime>[]>).pipe(
      map(animeArray => animeArray.map(anime => ({
        ...anime,
        id: anime.id ?? '',
        title: anime.title ?? '',
        status: anime.status ?? '',
        comment: anime.comment ?? '',
      })))
    );
  }

  addAnime(serie: Omit<Anime, 'id'>, root: string) {
    const animeRef = collection(this.firestore, root);
    return addDoc(animeRef, serie);
  }

  deleteAnime(id: string, root: string) {
    const animeDocRef = doc(this.firestore, `${root}/${id}`);
    return deleteDoc(animeDocRef);
  }

  updateAnime(id: string, anime: Pick<Anime, 'title' | 'status' | 'comment'>, root: string) {
    const animeDocRef = doc(this.firestore, `${root}/${id}`);
    return updateDoc(animeDocRef, anime);
  }

  updateAnimeList(
    id: string,
    anime: Pick<Anime, 'title' | 'status' | 'comment'>,
    sourceRoot: string,
    targetRoot: string
  ) {
    if (sourceRoot === targetRoot) {
      return this.updateAnime(id, anime, sourceRoot);
    }

    const batch = writeBatch(this.firestore);
    batch.set(doc(this.firestore, `${targetRoot}/${id}`), anime);
    batch.delete(doc(this.firestore, `${sourceRoot}/${id}`));
    return batch.commit();
  }

  // New structure
  getAnimeEntry(root: string): Observable<AnimeEntryModel[]> {
    const animeRef = collection(this.firestore, root);
    return (collectionData(animeRef, { idField: 'id' }) as Observable<Partial<AnimeEntryModel>[]>).pipe(
      map(animeArray => animeArray.map(anime => ({
        ...anime,
        id: anime.id ?? '',
        title_english: anime.title_english ?? '',
        type: anime.type ?? '',
        episodes: anime.episodes ?? 0,
        score: anime.score ?? 0,
        year: anime.year ?? 0,
        image_url: anime.image_url ?? '',
        status: anime.status ?? '',
        comment: anime.comment ?? '',
      })))
    );
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
