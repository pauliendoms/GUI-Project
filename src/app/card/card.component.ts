import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input() card: Card = {id: 0, question: "", answer: ""};

  ngOnInit(): void {
  }

}

export interface Card {
  id: number,
  question: string,
  answer: string,
}
