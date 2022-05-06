import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card.component';
import { DatabaseService } from '../database.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cardsview',
  templateUrl: './cardsview.component.html',
  styleUrls: ['./cardsview.component.css']
})
export class CardsviewComponent implements OnInit {

  cardsList: Card[] = [];
  foldername: string = "";

  constructor(private databaseService: DatabaseService, private loc: Location) { }

  newCard: Card = {id: 0, question: "", answer: ""};

  ngOnInit(): void {
    this.foldername = this.loc.path().split("/")[2];
    console.log(this.foldername);
  }

  onGetCards() : void {
    this.databaseService.getCards(this.foldername).subscribe(
      (response : Card[]) => {
        console.log('received:', response);
        this.cardsList = response;
      },
      (error) => console.log('error', error),
      () => console.log(this.cardsList)
    );
  }

}
