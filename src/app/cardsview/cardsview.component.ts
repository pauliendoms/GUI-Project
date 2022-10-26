import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card.component';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import { Folder } from '../folder/folder.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cardsview',
  templateUrl: './cardsview.component.html',
  styleUrls: ['./cardsview.component.css']
})
export class CardsviewComponent implements OnInit {

  cards: Card[] = [];
  folder: Folder = {id: "", name: ""};
  folderSubscription: Subscription = new Subscription;
  cardSubscription: Subscription = new Subscription;

  constructor(public data: DatabaseService, private route: ActivatedRoute, private router: Router) { }

  newCard: Card = {id: "", question: "", answer: "", folderId: ""};

  async ngOnInit() {
    this.folder.id = this.route.snapshot.params['id'];
    this.onGetFolder();
    this.onGetCards();
    this.newCard.folderId = this.folder.id;
  }

  onAddCard(): void {
    if (this.newCard.question != "" && this.newCard.answer != "") {
      this.data.addCard(this.newCard)
      this.newCard.question = "";
      this.newCard.answer = "";
    }
  }

  onSaveFolder():void {
    this.data.saveFolder(this.folder);
  }

  onDeleteFolder():void {
    this.data.deleteFolder(this.folder);
    this.router.navigate(["/cards"]);
  }

  onGetFolder(): void {
    this.folderSubscription = this.data.getFolder(this.folder.id).subscribe(
      folder => {
        this.folder = folder[0];
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

  ngOnDestroy(): void {
    this.cardSubscription.unsubscribe();
    this.folderSubscription.unsubscribe();
  }
}
