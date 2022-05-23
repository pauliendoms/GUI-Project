import { Component, OnInit, Input} from '@angular/core';
import { Card } from '../card/card.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  routerlink: string = "";

  constructor() { }

  @Input() folder: Folder = {id: 0, name: ""};

  ngOnInit(): void {
    this.routerlink = "/cards/" + this.folder.id;
  }

}

export interface Folder {
  id: number,
  name: string
}
