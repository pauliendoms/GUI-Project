import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from './card/card.component';
import { Folder } from './folder/folder.component';

@Injectable({
  providedIn: 'root'
})
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

  addFolder(folder: Folder) {
    const url = "http://localhost:3000/folders";
    this.http.post<Folder>(url, folder).subscribe(
      (response) => {
        this.updateFolders();
      },
      (error) => console.log('error: ', error)
    )
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
