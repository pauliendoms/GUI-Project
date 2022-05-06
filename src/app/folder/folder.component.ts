import { Component, OnInit, Input} from '@angular/core';
import { Card } from '../card/card.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  foldername: string = "";
  routerlink: string = "";

  constructor() { }

  @Input() folder: Folder = {cards: []};

  ngOnInit(): void {
    this.foldername = Object.keys(this.folder)[0];
    this.routerlink = "/cards/" + this.foldername;
    console.log(this.folder.cards)
  }

}

export interface Folder {
  cards: Card[];
}
