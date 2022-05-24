import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card.component';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import { Folder } from '../folder/folder.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardsview',
  templateUrl: './cardsview.component.html',
  styleUrls: ['./cardsview.component.css']
})
export class CardsviewComponent implements OnInit {

  cardsList: Card[] = [];
  folder: Folder = {id: 0, name: ""};

  constructor(public data: DatabaseService, private route: ActivatedRoute, private router: Router) { }

  newCard: Card = {id: 0, question: "", answer: "", folderId: 0};

  async ngOnInit() {
    this.folder.id = this.route.snapshot.params['id'];
    this.folder = await this.data.getFolder(this.folder.id)
    this.newCard.folderId = this.folder.id;
    this.data.updateCards(this.folder.id);
  }

  onAddCard() : void {
    if (this.newCard.question != "" && this.newCard.answer != "") {
      this.data.addCard(this.newCard)
      this.newCard.question = "";
      this.newCard.answer = "";
    }
  }

  onSaveFolder() {
    this.data.saveFolder(this.folder);
  }

  onDeleteFolder() {
    this.data.deleteFolder(this.folder);
    this.router.navigate(["/cards"]);
  }
}
