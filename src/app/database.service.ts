import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, Firestore, docData } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, deleteDoc, DocumentReference, query, setDoc, where, updateDoc } from 'firebase/firestore';
import { combineLatest, Observable } from 'rxjs';
import { Card } from './card/card.component';
import { Folder } from './folder/folder.component';
import { doc } from 'firebase/firestore';
import { isDelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  constructor(private db: Firestore) {}

  getPersonalFolders(uid: string): Observable<Folder[]> {
    console.log(uid)
    return collectionData<Folder>(
      query<Folder>(
        collection(this.db, 'folders') as CollectionReference<Folder>,
        where("uid", "==", uid)
      ), {idField: 'id'}
    );
  }

  getPublicFolders(): Observable<Folder[]> {
    return collectionData<Folder>(
      query<Folder>(
        collection(this.db, 'folders') as CollectionReference<Folder>,
        where('public', '==', true)
      ), {idField: 'id'}
    )
  }

  /*
  getAllFolders(uid: string): Observable<Folder[]> {
    let observables: Observable<Folder[]>[] = [];
    observables.push(collectionData<Folder>(
      query<Folder>(
        collection(this.db, 'folders') as CollectionReference<Folder>,
        where("public", "==", true),
      ), {idField: "id"}
    ));
    observables.push(collectionData<Folder>(
      query<Folder>(
        collection(this.db, 'folders') as CollectionReference<Folder>,
        where("uid", "==", uid),
      ), {idField: "id"}
    ));
    return combineLatest(observables);
  }*/

  getFolder(id: string): Observable<Folder> {
    return docData<Folder>(
      doc(this.db, 'folders/' + id) as DocumentReference<Folder>,
      {idField: 'id'}
    );
  }

  addFolder(folder: Folder): Promise<void> {
    const newId = doc(collection(this.db, 'id')).id;
    const ref = doc(this.db, 'folders/' + newId);
    return setDoc(ref, folder);
  }

  saveFolder(folder: Folder): Promise<void> {
    console.log("folder in saveFolder: ", folder);
    const ref = doc(this.db, 'folders/' + folder.id) as DocumentReference<Folder>;
    return updateDoc(ref, folder);
  }

  deleteFolder(folder: Folder): Promise<void> {
    const ref = doc(this.db, 'folders/' + folder.id);
    return deleteDoc(ref);
  }

  getCards(folderId: string): Observable<Card[]> {
    return collectionData<Card>(
      query<Card>(
        collection(this.db, 'cards') as CollectionReference<Card>,
        where("folderId", "==", folderId),
      ), {idField: 'id'}
    );
  }

  addCard(card: Card): Promise<void> {
    const newId = doc(collection(this.db, 'id')).id;
    const ref = doc(this.db, 'cards/' + newId);
    return setDoc(ref, card);
  }

  saveCard(card: Card): Promise<void> {
    const ref = doc(this.db, 'cards/' + card.id) as DocumentReference<Card>;
    return updateDoc(ref, card);
  }

  deleteCard(card: Card): Promise<void> {
    console.log("card in deleteCard: ", card);
    const ref = doc(this.db, 'cards/' + card.id);
    return deleteDoc(ref);
  }

  loadQuestions(folderId: string, amount: number) : Promise<Card[]> {
    return new Promise((resolve, reject) => {
      collectionData<Card>(
        query<Card>(
          collection(this.db, 'cards') as CollectionReference<Card>,
          where("folderId", "==", folderId)
        ), {idField: 'id'}).subscribe({
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

  getAdmin(id: string): Observable<Admin> {
    return docData<Admin>(
      doc(this.db, 'admin/' + id) as DocumentReference<Admin>,
      {idField: 'id'}
    );
  }
}

export interface Admin {
  id: string
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