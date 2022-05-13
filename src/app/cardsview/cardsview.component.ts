import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card.component';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cardsview',
  templateUrl: './cardsview.component.html',
  styleUrls: ['./cardsview.component.css']
})
export class CardsviewComponent implements OnInit {

  cardsList: Card[] = [];
  folder: number = 0; 

  constructor(public data: DatabaseService, private route: ActivatedRoute) { }

  newCard: Card = {id: null, question: "", answer: "", folderId: 0};

  ngOnInit(): void {
    this.folder = this.route.snapshot.params['id'];
    this.newCard.folderId = this.folder;
  }

  onAddCard() : void {
    if (this.newCard.question != "" && this.newCard.answer != "") {
      this.data.addCard(this.newCard)
    }
  }
}
