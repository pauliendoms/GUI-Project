import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from './card/card.component';
import { Folder } from './folder/folder.component';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  folders: Folder[] = [];
  cards: Card[] = [];

  updateFolders() {
    const url = "http://localhost:3000/folders";
    this.http.get<Folder[]>(url).subscribe(
      (response: Folder[]) => {
        this.folders = response;
      },
      (error) => console.log('error')
    )
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

  updateCards(folder: number) {
    const url = "http://localhost:3000/folders/" + folder + "/cards";
    this.http.get<Card[]>(url).subscribe(
      (response: Card[]) => {
        this.cards = response;
        console.log('success');
      },
      (error) => console.log("error: ", error)
    )
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
    const url = "http://loclahost:3000/cards/" + card.id;
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
}
