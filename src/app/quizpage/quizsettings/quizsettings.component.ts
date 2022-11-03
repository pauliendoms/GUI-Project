import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Folder } from 'src/app/folder/folder.component';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/card/card.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-quizsettings',
  templateUrl: './quizsettings.component.html',
  styleUrls: ['./quizsettings.component.css']
})
export class QuizsettingsComponent implements OnInit {

  constructor(public data : DatabaseService, private auth: AuthService) { }

  quizsettings : Quizsettings = {
    theme: "",
    amount: 1,
    repetitive: false,
    folderId: "",
  }

  selected : string = "";

  error: string = "";

  folders: Folder[] = [];
  personalFolderSubscription: Subscription = new Subscription;
  publicFolderSubscription: Subscription = new Subscription;

  cards: Card[] = [];
  cardSupscription: Subscription = new Subscription;

  adminSubscription: Subscription = new Subscription;

  uid: string = "";

  personalFolders: Folder[] = [];
  publicFolders: Folder[] = [];

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

  checkFolderLength(foldername: string): Promise<boolean> {

    for (let folder of this.folders) {
      if (folder.name == foldername) {
        this.quizsettings.folderId = folder.id;
      }
    }

    // this.onGetCards(folderId);

    return new Promise<boolean>((resolve, reject) => {
      this.cardSupscription = this.data.getCards(this.quizsettings.folderId).subscribe({
        next: (response: Card[]) => {
          this.cards = response;
          if (this.cards.length == 0) {
            resolve(false);
          } else {
            resolve(true);
          }
          reject("There was a problem while checking if this combination is possible")
        }
      })
    })

    /*
    console.log("cards after onGetCards in checkFolderLength", this.cards);
    if (this.cards.length == 0) {
      return false;
    } else {
      return true;
    }
    */
  }

  onGetFolders(): void {
    this.auth.uid.subscribe({
      next: (uid: string) => {
        if(this.auth.admin.getValue()){
          console.log("wel admin")
          this.personalFolderSubscription = this.data.getPersonalFolders(uid).subscribe({
            next: (res: Folder[]) => {
              this.folders = res;
            }
          })
        } else {
          console.log("geen admin")
          this.personalFolderSubscription = this.data.getPersonalFolders(uid).subscribe({
            next: (res: Folder[]) => {
              this.personalFolders = res;
              this.publicFolderSubscription = this.data.getPublicFolders().subscribe({
                next: (res: Folder[]) => {
                  console.log("how many times are we doing this?")
                  this.folders = [...this.personalFolders, ...res];
                }
              })
            }
          })
        }
      }
    })
    
  }

  onGetCards(folderId: string): void {
    this.cardSupscription = this.data.getCards(folderId).subscribe({
      next: (response: Card[]) => {
        console.log("response in onGetCards: ", response)
        this.cards = response;
      }
    })
  }

  ngOnDestroy(): void {
    this.personalFolderSubscription.unsubscribe();
    this.cardSupscription.unsubscribe();
  }

}

export interface Quizsettings {
  theme: string,
  amount: number,
  repetitive: boolean,
  folderId: string
}
