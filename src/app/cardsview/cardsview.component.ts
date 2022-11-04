import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card.component';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import { Folder } from '../folder/folder.component';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CanComponentDeactivate } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cardsview',
  templateUrl: './cardsview.component.html',
  styleUrls: ['./cardsview.component.css']
})
export class CardsviewComponent implements OnInit, CanComponentDeactivate {

  cards: Card[] = [];
  folder: Folder = {id: "", name: "", public: false, uid: ""};
  folderSubscription: Subscription = new Subscription;
  cardSubscription: Subscription = new Subscription;

  admin: boolean = false;

  constructor(public data: DatabaseService, private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  newCard: Card = {id: "", question: "", answer: "", folderId: ""};
  saved: boolean= false;

  async ngOnInit() {
    this.folder.id = this.route.snapshot.params['id'];
    console.log("I'm here and this is the folderid: ", this.folder.id);
    this.onGetFolder(); // het werkt maar moet hier geen await om zeker te zijn dat het allemaal voltooird is?  
    this.onGetCards();
    this.newCard.folderId = this.folder.id;
    this.auth.admin.subscribe({
      next: (res: boolean) => {
        this.admin = res;
      }
    })
  }

  onAddCard(): void {
    if (this.newCard.question != "" && this.newCard.answer != "") {
      this.data.addCard(this.newCard)
      this.newCard.question = "";
      this.newCard.answer = "";
    }
  }

  onSaveFolder():void {
    console.log("folder before saveFolder: ", this.folder);
    this.data.saveFolder(this.folder);
  }

  onDeleteFolder():void {
    this.data.deleteFolder(this.folder);
    this.router.navigate(["/cards"]);
  }

  onGetFolder(): void {
    this.folderSubscription = this.data.getFolder(this.folder.id).subscribe(
      folder => {
        console.log("response in onGetFolder: ", folder)
        this.folder = folder;
      }
    );
  }

  onGetCards(): void {
    this.cardSubscription = this.data.getCards(this.folder.id).subscribe(
      cards => {
        this.cards = cards;
      }
    )
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.saved === false) {
      return confirm("Are you sure you want to leave this page?");
    } else {
      return true;
    }
  }

  onSaveStatus() :void {
    this.data.saveFolder(this.folder);
  }

  ngOnDestroy(): void {
    this.cardSubscription.unsubscribe();
    this.folderSubscription.unsubscribe();
  }
}
