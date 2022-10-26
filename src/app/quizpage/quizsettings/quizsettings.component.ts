import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Folder } from 'src/app/folder/folder.component';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/card/card.component';

@Component({
  selector: 'app-quizsettings',
  templateUrl: './quizsettings.component.html',
  styleUrls: ['./quizsettings.component.css']
})
export class QuizsettingsComponent implements OnInit {

  constructor(public data : DatabaseService) { }

  quizsettings : Quizsettings = {
    theme: "",
    amount: 1,
    repetitive: false,
  }

  selected : string = "";

  error: string = "";

  folders: Folder[] = [];
  folderSubscription: Subscription = new Subscription;

  cards: Card[] = [];
  cardSupscription: Subscription = new Subscription;

  @Output() quizStart = new EventEmitter<Quizsettings>();

  ngOnInit(): void {
    this.onGetFolders();
  }

  async startQuiz() {
    console.log(this.quizsettings);

    if (this.quizsettings.theme == "") {
      this.error = "Combination not possible";
      return;
    } else if (this.quizsettings.amount == null) {
      this.error = "Combination not possible";
      return;
    } else if (!(await this.checkFolderLength(this.quizsettings.theme))) {
      this.error = "Combination not possible";
      return;
    }



    console.log("starting");
    this.quizStart.emit(this.quizsettings);
  }

  checkFolderLength(foldername: string) {
    let folderId: string = "";

    for (let folder of this.folders) {
      if (folder.name == foldername) {
        folderId = folder.id;
      }
    }

    this.onGetCards(folderId);
    if (this.cards.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  onGetFolders(): void {
    this.folderSubscription = this.data.getFolders().subscribe({
      next: (response: Folder[]) => {
        this.folders = response;
      }
    }); 
  }

  onGetCards(folderId: string): void {
    this.cardSupscription = this.data.getCards(folderId).subscribe({
      next: (response: Card[]) => {
        this.cards = response;
      }
    })
  }

  ngOnDestroy(): void {
    this.folderSubscription.unsubscribe();
    this.cardSupscription.unsubscribe();
  }

}

export interface Quizsettings {
  theme: string,
  amount: number,
  repetitive: boolean,
}
