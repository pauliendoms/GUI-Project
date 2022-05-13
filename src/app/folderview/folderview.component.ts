import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Folder } from '../folder/folder.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folderview',
  templateUrl: './folderview.component.html',
  styleUrls: ['./folderview.component.css']
})
export class FolderviewComponent implements OnInit {
  folders: Folder[] = [];
  newFolder: Folder = {id: null, name: ""};

  constructor(public data: DatabaseService, private router : Router) { }

  ngOnInit(): void {
  }

  onAddFolder() : void {
    if (this.newFolder.name != "") {
      this.data.addFolder(this.newFolder);
    }
  }
}
