import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Artcile } from '../models/artcile';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private dbPath = '/Articles';

  articleRef: AngularFirestoreCollection<Artcile>;

  constructor(private db: AngularFireDatabase,private deba : AngularFirestore) {
    this.articleRef = deba.collection(this.dbPath);

  }
  // Create article
  Addarticle(article: Artcile) {
    return this.articleRef.add(article);
  }
  // Fetch Single article Object
  Getarticle(id: string) {
    return this.articleRef.doc(id).valueChanges();
  }
  // Fetch articles List
  GetarticlesList() : AngularFirestoreCollection<Artcile>{
    return this.articleRef;
  }
  // Update article Object
  Updatearticle(id : string,article: Artcile) {
    return this.articleRef.doc(id).update(article);
  }
  // Delete article Object
  Deletearticle(id: string) {
    this.articleRef.doc(id).delete();
  }
   generateRandomId(): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId: string = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }
}
