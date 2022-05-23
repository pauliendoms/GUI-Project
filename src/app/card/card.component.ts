import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public data: DatabaseService) { }

  @Input() card: Card = {id: 0, question: "", answer: "", folderId: 0};

  ngOnInit(): void {
  }

  onSaveCard() : void {
    
    console.log("sending", this.card);
    if (this.card.question != "" && this.card.answer != "") {
      this.data.saveCard(this.card);
    }
  }

  onDeleteCard() : void {
    this.data.deleteCard(this.card);
  }

}

export interface Card {
  id: number,
  question: string,
  answer: string,
  folderId: number
}
