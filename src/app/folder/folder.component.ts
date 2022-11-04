import { Component, OnInit, Input} from '@angular/core';
import { Card } from '../card/card.component';
import { LimitLengthPipe } from '../limit-length.pipe';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  routerlink: string = "";

  constructor() { }

  @Input() folder: Folder = {id: "", name: "", public: false, uid: ""};

  ngOnInit(): void {
    this.routerlink = "/cards/" + this.folder.id;
  }

}

export interface Folder {
  id: string,
  name: string,
  public: boolean,
  uid: string
}
