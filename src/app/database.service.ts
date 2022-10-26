import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, deleteDoc, query, setDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Card } from './card/card.component';
import { Folder } from './folder/folder.component';
import { doc } from 'firebase/firestore';
import { isDelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  constructor(private db: Firestore) {}

  getFolders(): Observable<Folder[]> {
    return collectionData<Folder>(
      collection(this.db, 'folders') as CollectionReference<Folder>
    );
  }

  getFolder(id: string): Observable<Folder[]> {
    return collectionData<Folder>(
      query<Folder>(
        collection(this.db, 'folders') as CollectionReference<Folder>,
        where("id", "==", id)
      )
    );
  }

  addFolder(folder: Folder): Promise<void> {
    const newId = doc(collection(this.db, 'id')).id;
    const ref = doc(this.db, 'folders/' + newId);
    return setDoc(ref, folder);
  }

  saveFolder(folder: Folder): Promise<void> {
    const ref = doc(this.db, 'folders/' + folder.id);
    return setDoc(ref, folder);
  }

  deleteFolder(folder: Folder): Promise<void> {
    const ref = doc(this.db, 'folders/' + folder.id);
    return deleteDoc(ref);
  }

  // update, add, save, delete

  getCards(folderId: string): Observable<Card[]> {
    return collectionData<Card>(
      query<Card>(
        collection(this.db, 'cards') as CollectionReference<Card>,
        where("folderId", "==", folderId)
      )
    );
  }

  addCard(card: Card): Promise<void> {
    const newId = doc(collection(this.db, 'id')).id;
    const ref = doc(this.db, 'cards/' + newId);
    return setDoc(ref, card);
  }

  saveCard(card: Card): Promise<void> {
    const ref = doc(this.db, 'cards/' + card.id);
    return setDoc(ref, card);
  }

  deleteCard(card: Card): Promise<void> {
    const ref = doc(this.db, 'cards/' + card.id);
    return deleteDoc(ref);
  }

  loadQuestions(folderId: string, amount: number) : Promise<Card[]> {
    return new Promise((resolve, reject) => {
      collectionData<Card>(
        query<Card>(
          collection(this.db, 'cards') as CollectionReference<Card>,
          where("folderId", "==", folderId)
        )).subscribe({
          next: async (cards: Card[]) => {

          if (amount > cards.length) {
            amount = cards.length;
          }

          let questions: Card[] = [];

          for (let i = 0; i < amount; i++) {
          
            let random =  Math.floor(Math.random() * cards.length);
            
            let question = cards[random];
            let check: boolean = false;

            while (!check) {
              if (questions.includes(question)) {
                question = cards[Math.floor(Math.random() * cards.length)];
              } else {
                questions.push(question);
                check = true;
              }
            }
          }
          resolve(questions);
        },
        error: (error) => reject()
      })
    })
  }
}

/*
export class DatabaseService {

  constructor(private http: HttpClient) { }

  folders: Folder[] = [];
  cards: Card[] = [];
  questions: Card[] = [];

  updateFolders() {
    const url = "http://localhost:3000/folders";
    this.http.get<Folder[]>(url).subscribe(
      (response: Folder[]) => {
        this.folders = response;
        console.log('succes');
      },
      (error) => console.log('error')
    )
  }

  getFolder(folderId: number) : Promise<Folder> {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:3000/folders/" + folderId;
      this.http.get<Folder>(url).subscribe({
        next: (response: Folder) => {
          resolve(response);
        },
        error: (error: any) => reject(error)
      })
    });
  }

  addFolder(folder: Folder) {
    const url = "http://localhost:3000/folders";
    this.http.post<Folder>(url, folder).subscribe(
      (response) => {
        this.updateFolders();
      },
      (error) => console.log('error: ', error)
    )
  }

  saveFolder(folder: Folder) {
    const url = "http://localhost:3000/folders/" + folder.id;
    this.http.put<Folder>(url, folder).subscribe({
      next: (response: Folder) => {
        this.updateFolders();
      },
      error: (error: any) => {
        console.log("error", error);
      }
    })
  }

  deleteFolder(folder: Folder) {
    const url = "http://localhost:3000/folders/" + folder.id;
    this.http.delete(url).subscribe({
      next: (response) => {
        this.updateFolders;
      },
      error: (error) => console.log("error", error)
    })
  }

  updateCards(folder: number) : Promise<void> {
    return new Promise((resolve, reject) => {
      const url = "http://localhost:3000/folders/" + folder + "/cards";
      this.http.get<Card[]>(url).subscribe({
        next: (response: Card[]) => {
          this.cards = response;
          resolve();
        },
        error: (error: any) => reject(error)
      })
    });
  }

  addCard(card: Card) {
    const url = "http://localhost:3000/folders/" + card.folderId + "/cards";
    this.http.post<Card>(url, card).subscribe(
      (response) => {
        console.log("success");
        this.updateCards(card.folderId);
      },
      (error) => console.log('error: ', error)
    )
  }

  saveCard(card: Card) {
    const url = "http://localhost:3000/cards/" + card.id;
    this.http.put<Card>(url, card).subscribe(
      (response : Card) => {
        console.log("success");
        this.updateCards(card.folderId);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  deleteCard(card: Card) {
    const url = "http://localhost:3000/cards/" + card.id;
    this.http.delete(url).subscribe(
      (response) => {
        console.log("succes");
        this.updateCards(card.folderId);
      },
      (error) => console.log('error', error)
    )
  }

  loadQuestions(folder: string, amount: number) : Promise<void> {
    let id: number = 0;
    const url = "http://localhost:3000/folders?name=" + folder;
    return new Promise((resolve, reject) => {
      this.http.get<Folder[]>(url).subscribe({
        next: async (response: Folder[]) => {
          console.log(response)
          id = response[0].id;
          await this.updateCards(id);

          if (amount > this.cards.length) {
            amount = this.cards.length;
          }

          let questions: Card[] = [];

          for (let i = 0; i < amount; i++) {
          
            let random =  Math.floor(Math.random() * this.cards.length);
            
            let question = this.cards[random];
            let check: boolean = false;

            while (!check) {
              if (questions.includes(question)) {
                question = this.cards[Math.floor(Math.random() * this.cards.length)];
              } else {
                questions.push(question);
                check = true;
              }
            }
          }

          this.questions = questions;
          resolve();
        },
        error: (error) => reject()
      })
    })
  }
}

*/